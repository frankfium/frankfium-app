<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { user } from '../stores'; // Import the global user store

	let usernameInput = '';
	let passwordInput = '';

	async function login(event: Event) {
		event.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: usernameInput, password: passwordInput })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			let data = await response.json();
			user.set(data.user);
			// Optional: Redirect on successful login
			if (data.user) {
				// Clear form fields after successful login
				usernameInput = '';
				passwordInput = '';
				goto('/adminOnly'); // Or your desired authenticated route
			}
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
				<div class="col md-3"></div>
				<div class="col md-3">
					<h2>admin login</h2>
					<br />

					<form use:enhance method="POST" on:submit|preventDefault={login}>
						<fieldset class="form-group">
							<label for="username">Username</label>
							<input
								type="text"
								class="form-control"
								id="username"
								placeholder="username"
								bind:value={usernameInput}
							/>
						</fieldset>
						<fieldset class="form-group">
							<label for="password">Password</label>
							<input type="password" class="form-control" id="password" placeholder="Password" bind:value={passwordInput} />
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
