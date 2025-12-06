# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20
ARG PHP_VERSION=8.3

FROM node:${NODE_VERSION}-bookworm AS frontend-builder
WORKDIR /var/www/html
COPY package*.json ./
RUN npm ci
COPY resources ./resources
COPY public ./public
COPY vite.config.js tailwind.config.js postcss.config.js jsconfig.json ./
RUN npm run build

FROM php:${PHP_VERSION}-fpm-bookworm AS app
ARG UID=1000
ARG GID=1000

RUN apt-get update \
    && apt-get install -y \
        git \
        unzip \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libwebp-dev \
        libzip-dev \
        libonig-dev \
        libxml2-dev \
        libicu-dev \
        libcurl4-openssl-dev \
        pkg-config \
        libssl-dev \
        librabbitmq-dev \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        gd \
        intl \
        pcntl \
        pdo_mysql \
        zip

RUN pecl install redis \
    && docker-php-ext-enable redis

RUN groupadd -g ${GID} laravel \
    && useradd -u ${UID} -g laravel -m laravel

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --optimize-autoloader

COPY . .
COPY --from=frontend-builder /var/www/html/public/build ./public/build

# Ensure publicly accessible storage symlink exists for uploaded assets
RUN php artisan storage:link

RUN chown -R laravel:laravel storage bootstrap/cache public/storage

USER laravel
CMD ["php-fpm"]

FROM nginx:1.27-alpine AS web
WORKDIR /var/www/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=app /var/www/html /var/www/html
