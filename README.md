# Securekit

Secure your [sveltekit](https://kit.svelte.dev/) app using [http response headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)

## Installation

```bash
bun install -d @islamzaoui/securekit
```

you can also use other package managers like [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

## Usage

### default headers

```ts
// src/hooks.server.ts
import { securityHeaders } from '@islamzaoui/securekit';

export const handle = securityHeaders().handle;
```

### with custom headers

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

## Content Security Policy header

your can use `csp` option in `securityHeaders` to set the `Content-Security-Policy` header directives.

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
