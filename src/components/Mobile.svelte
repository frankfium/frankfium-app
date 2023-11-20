<script>
	import { base } from '$app/paths';
	import resume from '../lib/FranksResume.pdf';
</script>
<section id="mobile">
	<div id="ShowOnMobile">
		<div class="container mt-2">
			<div class="custom-container">
				<div class="col-sm-9 p-3">
					<p>Frank Fiumara</p>
					<h1>HELLO,</h1>
					<br />
					<p>
						I am a passionate software developer with a keen eye for innovation and a deep love for
						coding. I specialize in crafting elegant and efficient software solutions that not only
						meet the needs of clients but also push the boundaries of what technology can achieve.
						With a strong foundation in multiple programming languages and a dedication to lifelong
						learning, I'm committed to staying at the forefront of the ever-evolving tech landscape.
					</p>
					<div class="row">
						<a href={resume} target="_blank">Resume</a>
						<a href="https://github.com/frankfium" target="_blank">GitHub</a>
						<a href="https://www.linkedin.com/in/frankpop10/" target="_blank">LinkedIn</a>
						<a href="mailto:fiumara.frank10@gmail.com?subject=Insert heart-felt message.">Email</a>
						<a href="{base}/admin">Admin</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
