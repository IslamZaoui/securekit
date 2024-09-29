# Securekit

Secure your [sveltekit](https://kit.svelte.dev/) app using [http response headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)

[![CI/CD](https://github.com/IslamZaoui/securekit/actions/workflows/lint.yaml/badge.svg)](https://github.com/IslamZaoui/securekit/actions/workflows/lint.yaml)
[![NPM](https://img.shields.io/npm/v/%40islamzaoui%2Fsecurekit)](https://www.npmjs.com/package/@islamzaoui/securekit)
[![Issues](https://img.shields.io/github/issues/IslamZaoui/securekit)](https://github.com/IslamZaoui/securekit/issues)
[![License](https://img.shields.io/github/license/IslamZaoui/securekit)](https://github.com/IslamZaoui/securekit/blob/main/LICENSE)

## Installation

```bash
bun install -d @islamzaoui/securekit
```

you can also use other package managers like [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

## Usage

### default headers

this will add the default headers to the response, this will be enough to get your website A grade in [security headers](https://securityheaders.com/)

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';

export const handle = securityHeaders().handle;
```

### with custom headers

you can customize the headers you want to set, and override any of the headers available in response headers.

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';

export const handle = securityHeaders({
    headers: {
        'Access-Control-Allow-Origin': 'https://yoursite.com',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
        ....
    }
}).handle;
```

### with multiple handles

you can use [sequence](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks) to sequencing other handles with `securityHeaders`.

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
    securityHeaders({
        headers: {
            ...
        }
    }),
    yourOtherHandle
);
```

### delete headers

set the value to `null` to delete the header.

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';

export const handle = securityHeaders({
    headers: {
        'Access-Control-Allow-Origin': 'https://yoursite.com',
        'x-sveltekit-page': null, // this will be deleted
    },
});
```

## Content Security Policy header

your can use `csp` option in `securityHeaders` to set the `Content-Security-Policy` header directives.

**Note**:

-   `config.csp` directives will override any existing directives in the `Content-Security-Policy` header.

-   `config.csp` directives will extend the existing directives in [svelte.config.js](https://kit.svelte.dev/docs/configuration#csp)

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';

export const handle = securityHeaders({
    csp: {
        directives: {
            'script-src': ["'self'",'https://example.com'],
            'style-src': ["'self'", 'https://example.com'],
            ...
        }
    }
}).handle;
```

## Debugging

you can set `debug` option to **true** in `securityHeaders` to enable debug logging on every request.

or you can use [security headers](https://securityheaders.com/) to scan your website in production.

## Roadmap

See the [open issues](https://github.com/islamzaoui/securekit/issues) for a list of proposed features (and known issues).

## Acknowledgements

-   [sveltekit-security-headers](https://github.com/kevinobee/sveltekit-security-headers)

## License

[MIT](https://github.com/IslamZaoui/securekit/blob/main/LICENSE) License
