import { Csp } from './csp';
import { HTTPResponseHeaders } from './http';

export type Config = {
    /**
     * Headers to be included in the HTTP response object.
     * @default
     * 'X-Frame-Options': 'DENY',
     * 'X-Content-Type-Options': 'nosniff',
     * 'Referrer-Policy': 'strict-origin-when-cross-origin',
     * 'Permissions-Policy': 'geolocation=(), camera=(), microphone=()'
     */
    headers: HTTPResponseHeaders;

    /**
     * Indicates whether debug mode is enabled.
     *
     * If true will log headers in the console.
     * @default false
     */
    debug?: boolean | undefined;

    /**
     * Content Security Policy Directives to be applied.
     *
     * This will override any CSP headers set in `config.headers`, and extend csp directives in your `svelte.config.js`.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
     * @default undefined
     */
    csp?: Csp | undefined;
};
