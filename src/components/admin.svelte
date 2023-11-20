<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import '../routes/api/login.js';

	const user = writable(null);

	async function login(event: Event) {
		event.preventDefault();
		const username = (document.getElementById('username') as HTMLInputElement).value;
		const password = (document.getElementById('password') as HTMLInputElement).value;

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			let data = await response.json();
			user.set(data.user);
		} catch (err) {
			console.error('Failed to login or parse response as JSON', err);
			return;
		}
	}

	function goHome() {
		goto('/');
	}
</script>

<section id="desktop">
	<div id="HideOnMobile">
		<div class="container mt-2">
			<div class="custom-container">
				<div class="col md-3" />
				<div class="col md-3">
					<h2>admin login</h2>
					<br />

					<form use:enhance method="POST" on:submit|preventDefault={login}>
						<fieldset class="form-group">
							<label for="username">Username</label>
							<input type="username" class="form-control" id="username" placeholder="username" />
						</fieldset>
						<fieldset class="form-group">
							<label for="password">Password</label>
							<input type="password" class="form-control" id="password" placeholder="Password" />
						</fieldset>
						<br />
						<div class="col">
							<button type="submit" class="btn btn-primary">submit</button>
							<button type="button" class="btn btn-primary" on:click={goHome}>Home</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
