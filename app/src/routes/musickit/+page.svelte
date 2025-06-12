<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();
	const developerToken = data.developerToken;

	let reachable = $state(true);
	let musicKit = $state({ instance: undefined as MusicKit.MusicKitInstance | undefined });
	let loaded = $derived(!!musicKit.instance);
	let musicUserToken = $derived(musicKit?.instance?.musicUserToken || '');

	const musicKitLoadedEvent = 'musickitloaded';

	onMount(function () {
		if (window.MusicKit) {
			console.log('MusicKit is already loaded');
			onMusicKitLoaded();
			return;
		}
		console.log('MusicKit is not loaded yet, waiting for event');
		document.addEventListener(musicKitLoadedEvent, onMusicKitLoaded);
		return () => {
			document.removeEventListener(musicKitLoadedEvent, onMusicKitLoaded);
		};
	});

	async function onMusicKitLoaded() {
		// Test connectivity with the Apple Music API.
		try {
			const testResponse = await fetch('https://api.music.apple.com/v1/test', {
				headers: {
					Authorization: `Bearer ${developerToken}`
				}
			});
			reachable = testResponse.ok;
		} catch (error) {
			console.error('Unable to reach Apple Music test endpoint:', error);
			reachable = false;
			return;
		}
		// Load the MusicKit instance.
		try {
			// NOTE: Using `await` here ensures that the MusicKit instance is fully configured before proceeding.
			// This is a breaking change from v1 to v3 of MusicKit JS.
			const musicKitInstance = await window.MusicKit.configure({
				developerToken,
				app: {
					name: 'My App',
					version: '1.0',
					build: '1'
				}
			});
			musicKit.instance = musicKitInstance;
		} catch (error) {
			// Handle configuration error
			console.error('Unable to load the MusicKit instance:', error);
		}
	}

	async function authorize() {
		try {
			musicUserToken = (await musicKit.instance?.authorize()) || '';
			console.log('Authorized with token:', musicUserToken);
		} catch (error) {
			console.error('Authorization error:', error);
		}
	}

	async function unauthorize() {
		try {
			await musicKit.instance?.unauthorize();
			musicUserToken = '';
		} catch (error) {
			console.error('Unauthorize error:', error);
		}
	}
</script>

<svelte:head>
	<title>MusicKit JS v3</title>
	<script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js" async></script>
</svelte:head>

<h1>MusicKit JS v3</h1>

{#if reachable}
	{#if loaded}
		{#if musicUserToken}
			<button onclick={unauthorize}>Unauthorize</button>
		{:else}
			<button onclick={authorize}>Authorize</button>
		{/if}
	{:else}
		<p>Loading MusicKit JS.</p>
	{/if}
{:else}
	<p>Apple Music API is not reachable. Check your network connection or developer token.</p>
{/if}
