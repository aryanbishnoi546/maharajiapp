import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.axios = axios;
window.Pusher = Pusher;

const currentOrigin = window.location.origin;
const isSecureContext = window.location.protocol === 'https:';
const inferredPort = window.location.port
    ? Number(window.location.port)
    : isSecureContext
        ? 443
        : 80;
const secureWsPort = Number(import.meta.env.VITE_PUSHER_PORT_SSL ?? inferredPort);
const insecureWsPort = Number(import.meta.env.VITE_PUSHER_PORT ?? 6001);

window.axios.defaults.baseURL = import.meta.env.VITE_HTTP_BASE ?? currentOrigin;
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY ?? 'local',
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: import.meta.env.VITE_PUSHER_HOST ?? window.location.hostname,
    wsPort: insecureWsPort,
    wssPort: secureWsPort,
    forceTLS: isSecureContext || (import.meta.env.VITE_PUSHER_SCHEME === 'https'),
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
});
