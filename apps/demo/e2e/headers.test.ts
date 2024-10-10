import { expect, test } from '@playwright/test';

test('home page has expected headers', async ({ page }) => {
	const response = await page.goto('/');
	if (response) {
		const headers = await response.allHeaders();
		expect(headers).toHaveProperty('access-control-allow-origin');
		expect(headers).toHaveProperty('content-security-policy');
		expect(headers).toHaveProperty('permissions-policy');
		expect(headers).toHaveProperty('x-content-type-options');
		expect(headers).toHaveProperty('x-frame-options');
	} else {
		throw new Error('Failed to load the home page');
	}
});

test('home page have removed headers', async ({ page }) => {
	const response = await page.goto('/');
	if (response) {
		const headers = await response.allHeaders();
		expect(headers).not.toHaveProperty('x-sveltekit-page');
	} else {
		throw new Error('Failed to load the home page');
	}
});
