export function formatCurrency(amount, market = {}) {
    const numericAmount = Number(amount ?? 0);
    const rate = Number(market.currency_rate ?? 1) || 1;
    const value = numericAmount * rate;
    const currency = market.currency_code ?? 'USD';
    const locale = market.locale ?? 'en-US';

    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(value);
    } catch (error) {
        const symbol = market.currency_symbol ?? '$';
        return `${symbol}${value.toFixed(2)}`;
    }
}

export function getCurrencySymbol(market = {}) {
    return market.currency_symbol ?? '$';
}
