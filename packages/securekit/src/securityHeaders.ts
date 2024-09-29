import { Handle } from '@sveltejs/kit';
import rules from './constants/rules';
import { Config } from './types';
import {
    normalizeCspValue,
    normalizeHeaderValue,
} from './utils/headerNormalizers';
import { combineCspHeaders } from './utils/cspHelpers';

/**
 * Sets HTTP response security headers based on the provided configuration.
 *
 * @param {Config} [config] - Configuration object for secure headers.
 * @param {HTTPResponseHeaders} [config.headers] - Custom headers to set. Defaults to predefined security headers.
 * @param {boolean} [config.debug=false] - Enables debug logging if true.
 * @param {Csp} [config.csp] - Content Security Policy directives.
 *
 * @returns {Object} An object containing the handle function to process requests.
 * @property {Handle} handle - A SvelteKit handle function that applies the configured security headers to each response.
 *
 * @example
 * // Basic usage with default settings
 * export const handle = securityHeaders().handle;
 *
 * @example
 * // Custom configuration
 * export const handle = securityHeaders({
 *   headers: {
 *     'Access-Control-Allow-Origin': 'https://example.com',
 *     'X-Frame-Options': 'SAMEORIGIN'
 *   },
 *   debug: true,
 *   csp: {
 *     directives: {
 *       'default-src': ["'self'"],
 *       'script-src': ["'self'", 'https://trusted-cdn.com']
 *     }
 *   }
 * }).handle;
 */
export const securityHeaders = (
    config: Config = {
        headers: {
            ...rules.defaultHeaders,
        },
        debug: false,
        csp: undefined,
    },
) => {
    const headers = new Map<string, string | null>();

    if (config?.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
            if (value !== undefined)
                headers.set(key, normalizeHeaderValue(value));
        });
    }

    if (config?.csp) {
        const cspDirectives = Object.entries(config.csp.directives)
            .map(([key, value]) => `${key} ${normalizeCspValue(value)}`)
            .join('; ');
        headers.set('Content-Security-Policy', cspDirectives);
    }

    const handle: Handle = async ({ event, resolve }) => {
        const response = await resolve(event);

        headers.forEach((value, key) => {
            if (key.toLocaleLowerCase() === 'content-security-policy') {
                const existingCsp = response.headers.get(
                    'Content-Security-Policy',
                );
                const combinedCsp = combineCspHeaders(existingCsp, value);
                if (combinedCsp) {
                    response.headers.set(
                        'Content-Security-Policy',
                        combinedCsp,
                    );
                }
            } else {
                if (value) response.headers.set(key, value);
                else response.headers.delete(key);
            }
        });

        if (config?.debug) {
            console.log(
                '[DEBUG] securekit Headers:\n',
                JSON.stringify(Object.fromEntries(response.headers), null, 2),
            );
        }

        return response;
    };

    return { handle };
};
