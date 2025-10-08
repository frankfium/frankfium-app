<script>
	import './../styles/styles.css';
	import resume from '../lib/FranksResume.pdf';
    import { base } from '$app/paths';
	import CustomCursor from '../lib/CustomCursor.svelte';
</script>
<div class="app">
	<CustomCursor />
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
