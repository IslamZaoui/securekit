import { Handle } from '@sveltejs/kit';
import { Config } from './types';
import { normalizeCspValue, normalizeHeaderValue } from './utils';
import { rules } from './headers';

/**
 * sets HTTP response security headers based on the provided configuration.
 *
 * @param {Config} [config] - Configuration object for secure headers.
 * @param {Object} [config.headers] - Custom headers to set.
 * @param {boolean} [config.debug] - Enables debug logging if true.
 * @param {Object} [config.csp] - Content Security Policy directives.
 * @returns {Object} An object containing the handle function to process requests.
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
    const headers = new Map<string, string>();

    if (config?.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
            value && headers.set(key, normalizeHeaderValue(value));
        });
    }

    if (config?.csp) {
        const cspDirectives = Object.entries(config.csp.directives)
            .map(([key, value]) => `${key} ${normalizeCspValue(value)}`)
            .join('; ');
        headers.set('Content-Security-Policy', cspDirectives);
    }

    const handle: Handle = async ({ event, resolve }) => {
        if (config?.debug) {
            console.log(
                '[DEBUG] securekit Headers:',
                JSON.stringify(Object.fromEntries(headers), null, 2),
            );
        }

        const response = await resolve(event);

        headers.forEach((value, key) => {
            response.headers.set(key, value);
        });

        return response;
    };

    return { handle };
};

export { rules } from './headers';
