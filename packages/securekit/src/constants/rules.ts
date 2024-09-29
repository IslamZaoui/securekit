import { HTTPResponseHeaders } from '../types/http';

const defaultHeaders: HTTPResponseHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
};

export default {
    /**
     * Default headers for secure headers.
     * @example
     * 'X-Frame-Options': 'DENY',
     * 'X-Content-Type-Options': 'nosniff',
     * 'Referrer-Policy': 'strict-origin-when-cross-origin',
     * 'Permissions-Policy': 'geolocation=(), camera=(), microphone=()'
     */
    defaultHeaders,
};
