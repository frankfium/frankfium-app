<script lang="ts">
	import { user as userStore } from '../../stores'; // Renamed to avoid conflict with `data.user`
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment'; // To ensure code runs only in browser
	import { onMount } from 'svelte';

	export let data: { user: { username: string } | null }; // Received from +page.server.ts load function

	onMount(() => {
		// Sync the global store with the user data from the server
		if (data.user) {
			userStore.set(data.user);
		} else {
			// This case should have been handled by a redirect in hooks.server.ts or +page.server.ts
			// If we reach here without data.user, ensure the store is also null.
			userStore.set(null);
		}
	});

	// Reactive statement for redirection:
	// This primarily handles client-side state changes (e.g., after a logout action clears the store)
	// or as a final fallback if the page renders without an authenticated user.
	$: if (browser && !$userStore) {
		// If the store is null (e.g., after logout) and we're on the client, redirect.
		// The initial server-side check is done by hooks and the load function.
		if (data.user) { // Only redirect if we *expected* a user from server but store is now empty
			goto('/admin');
		} else if (!data.user) { // If server also didn't provide a user (should have redirected)
            goto('/admin');
        }
	}
</script>

<svelte:head>
	<title>Admin Only Area</title>
</svelte:head>
<section class="container mt-5 text-center">
	{#if data.user} <!-- Primarily rely on data from server load for initial render -->
		<h1>Welcome to the Admin Only Area, {data.user.username}!</h1>
		<p>This content is protected and only visible to authenticated administrators.</p>
		<p>You can add your admin-specific tools and information here.</p>
		<button class="btn btn-danger mt-3" on:click={async () => {
			// Example logout: clear cookie by calling a logout API (recommended)
			// await fetch('/api/logout', { method: 'POST' });
			// For now, just clear client store and redirect
			userStore.set(null);
			goto('/');
		}}>Logout</button>
	{:else}
		<!-- This content will be briefly visible if $user is null before the redirect happens -->
		<p>Access Denied. Redirecting to login...</p>
	{/if}
</section>
<style>
	.container {
		padding: 2rem;
	}
</style>