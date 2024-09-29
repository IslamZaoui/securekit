import { dev } from '$app/environment';
import { securityHeaders, rules } from '@islamzaoui/securekit';

const origin = dev ? 'http://localhost:5173' : 'https://securekit-demo.vercel.app';

export const handle = securityHeaders({
	headers: {
		...rules.defaultHeaders,
		'Access-Control-Allow-Origin': origin,
		'x-sveltekit-page': null
	},
	csp: {
		directives: {
			'base-uri': ["'self'"],
			'child-src': ["'self'"],
			'connect-src': ["'self'", 'ws://localhost:*'],
			'img-src': ["'self'", 'data:'],
			'font-src': ["'self'", 'data:'],
			'form-action': ["'self'"],
			'frame-ancestors': ["'self'"],
			'frame-src': ["'self'"],
			'manifest-src': ["'self'"],
			'media-src': ["'self'", 'data:'],
			'object-src': ["'none'"],
			'style-src': ["'self'"],
			'default-src': ["'self'", origin],
			'script-src': ["'self'"],
			'worker-src': ["'self'"]
		}
	},
	debug: dev
}).handle;
