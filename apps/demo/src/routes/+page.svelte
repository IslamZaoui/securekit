<script lang="ts">
	import { browser } from '$app/environment';

	let url = browser && window.location.href;
	let securityheadersURL = url
		? `https://securityheaders.com/?q=${encodeURIComponent(url)}&followRedirects=on`
		: undefined;
</script>

<main class="mx-auto flex min-h-screen items-center justify-center p-4">
	<div class="flex w-full max-w-[750px] flex-col gap-2 text-center">
		<h1 class="text-4xl font-bold">SecureKit Demo</h1>
		<p class="text-lg font-medium">Secure your sveltekit app using http response headers</p>
		<p class="text-lg font-medium">
			See <a
				class="text-blue-600 underline hover:no-underline"
				href="https://github.com/islamzaoui/securekit"
				target="_blank"
				rel="noopener noreferrer">securekit repo</a
			> for more information
		</p>
		{#if securityheadersURL}
			<a
				class="underline hover:no-underline"
				href={securityheadersURL}
				target="_blank"
				rel="noopener noreferrer">Check security headers report</a
			>
		{/if}
	</div>
</main>
