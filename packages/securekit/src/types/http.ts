type HTTPMethods =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';

type ReferrerPolicy =
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

type CrossOriginEmbedderPolicy =
    | 'require-corp'
    | 'unsafe-none'
    | 'credentialless';

type CrossOriginOpenerPolicy =
    | 'same-origin'
    | 'same-origin-allow-popups'
    | 'unsafe-none';

type CrossOriginResourcePolicy = 'same-site' | 'same-origin' | 'cross-origin';

export type HTTPResponseHeaders = {
    [key: string]: string | string[] | number | undefined | null;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security | Strict-Transport-Security MDN}
     */
    'Strict-Transport-Security'?: string;
    /**
     * Better to use csp in securekit function instead
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy | Content-Security-Policy MDN}
     */
    'Content-Security-Policy'?: string;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy | Referrer-Policy MDN}
     */
    'Referrer-Policy'?: ReferrerPolicy;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy | Permissions-Policy MDN}
     */
    'Permissions-Policy'?: string;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection | X-XSS-Protection MDN}
     */
    'X-XSS-Protection'?: string;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options | X-Frame-Options MDN}
     */
    'X-Frame-Options'?: 'DENY' | 'SAMEORIGIN';
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options | X-Content-Type-Options MDN}
     */
    'X-Content-Type-Options'?: 'nosniff';
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin | Access-Control-Allow-Origin MDN}
     */
    'Access-Control-Allow-Origin'?: '*' | string | string[];
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods | Access-Control-Allow-Methods MDN}
     */
    'Access-Control-Allow-Methods'?: '*' | HTTPMethods | HTTPMethods[];
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers | Access-Control-Allow-Headers MDN}
     */
    'Access-Control-Allow-Headers'?: '*' | string | string[];
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age | Access-Control-Max-Age MDN}
     */
    'Access-Control-Max-Age'?: number;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy | Cross-Origin-Embedder-Policy MDN}
     */
    'Cross-Origin-Embedder-Policy'?: CrossOriginEmbedderPolicy;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy | Cross-Origin-Opener-Policy MDN}
     */
    'Cross-Origin-Opener-Policy'?: CrossOriginOpenerPolicy;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy | Cross-Origin-Resource-Policy MDN}
     */
    'Cross-Origin-Resource-Policy'?: CrossOriginResourcePolicy;
};
