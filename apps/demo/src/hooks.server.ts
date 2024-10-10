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
			'connect-src': [
				"'self'",
				'ws://localhost:*',
				'wss://ws-us3.pusher.com',
				'https://sockjs-us3.pusher.com'
			],
			'img-src': ["'self'", 'data:'],
			'font-src': ["'self'", 'data:'],
			'form-action': ["'self'"],
			'frame-ancestors': ["'self'"],
			'frame-src': ["'self'", 'https://vercel.live'],
			'manifest-src': ["'self'"],
			'media-src': ["'self'", 'data:'],
			'object-src': ["'none'"],
			'style-src': ["'self'", "'unsafe-inline'", 'https://vercel.live'],
			'default-src': ["'self'", origin],
			'script-src': ["'self'", 'https://vercel.live'],
			'worker-src': ["'self'"]
		}
	},
	debug: dev
}).handle;
