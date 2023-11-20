<script lang="ts">
	import { base } from '$app/paths';
	import '../styles/styles.css';
	import About from '../components/About.svelte';
	import Head from '../components/Head.svelte';
	import Mobile from '../components/Mobile.svelte';
	
</script>

<section>
	<!-- svelte-ignore a11y-missing-attribute -->

	<html>
		<Head />
		<About />
		<Mobile />

		<script src="https://kit.fontawesome.com/458652aea3.js" crossorigin="anonymous"></script>
		<script
			src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
		></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	</html>
</section>

