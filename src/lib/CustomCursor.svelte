<script lang="ts">
	import { onMount } from 'svelte';
	
	let cursorElement: HTMLDivElement;
	
	onMount(() => {
		// Simple, fast mouse move handler
		const handleMouseMove = (e: MouseEvent) => {
			if (!cursorElement) return;
			
			cursorElement.style.left = `${e.clientX - 20}px`;
			cursorElement.style.top = `${e.clientY - 20}px`;
		};
		
		// Add only the essential event listener
		document.addEventListener('mousemove', handleMouseMove, { passive: true });
		
		// Cleanup
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div bind:this={cursorElement} class="custom-cursor"></div>

<style>
	.custom-cursor {
		position: fixed;
		width: 40px;
		height: 40px;
		border: 3px solid white;
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		box-shadow: 2px -3px 41px -1px rgba(250, 250, 250, 0.64);
	}
	
	/* Hide cursor on mobile devices */
	@media (max-width: 768px) {
		.custom-cursor {
			display: none;
		}
	}
</style>
