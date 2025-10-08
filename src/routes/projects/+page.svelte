<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	
	export let data: PageData;
	
	let repos = data.repos;
	let loading = true;
	let error = '';
	
	onMount(() => {
		loading = false;
	});
	
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
	
	function getLanguageColor(language: string | null): string {
		const colors: Record<string, string> = {
			'JavaScript': '#f7df1e',
			'TypeScript': '#3178c6',
			'Python': '#3776ab',
			'Java': '#ed8b00',
			'C++': '#00599c',
			'C#': '#239120',
			'Go': '#00add8',
			'Rust': '#000000',
			'PHP': '#777bb4',
			'Ruby': '#cc342d',
			'Swift': '#fa7343',
			'Kotlin': '#7f52ff',
			'HTML': '#e34f26',
			'CSS': '#1572b6',
			'SCSS': '#cf649a',
			'Svelte': '#ff3e00',
			'React': '#61dafb',
			'Vue': '#4fc08d',
			'Angular': '#dd0031',
			'Node.js': '#339933'
		};
		return colors[language || ''] || '#6b7280';
	}
</script>

<svelte:head>
	<title>Projects - Frank's Portfolio</title>
	<meta name="description" content="Explore my GitHub projects and repositories" />
</svelte:head>

<div class="projects-container">
	<h1>Projects</h1>
	
	{#if loading}
		<div class="loading">
			<p>Loading projects...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>Error: {error}</p>
		</div>
	{:else if repos.length === 0}
		<div class="no-projects">
			<p>No projects found. Please check your GitHub username configuration.</p>
		</div>
	{:else}
		<div class="projects-grid">
			{#each repos as repo}
				<div class="project-card custom-container">
					<div class="project-header">
						<h3>
							<a href="/projects/{repo.name}" class="project-link">
								{repo.name}
							</a>
						</h3>
						<div class="project-stats">
							<span class="stat">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
								</svg>
								{repo.stargazers_count}
							</span>
							<span class="stat">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
								</svg>
								{repo.forks_count}
							</span>
						</div>
					</div>
					
					{#if repo.description}
						<p class="project-description">{repo.description}</p>
					{/if}
					
					<div class="project-meta">
						{#if repo.language}
							<span class="language" style="--color: {getLanguageColor(repo.language)}">
								<span class="language-dot"></span>
								{repo.language}
							</span>
						{/if}
						
						<span class="updated">
							Updated {formatDate(repo.updated_at)}
						</span>
					</div>
					
					{#if repo.topics && repo.topics.length > 0}
						<div class="topics">
							{#each repo.topics.slice(0, 5) as topic}
								<span class="topic">{topic}</span>
							{/each}
						</div>
					{/if}
					
					<div class="project-actions">
						<a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="btn">
							View on GitHub
						</a>
						<a href="/projects/{repo.name}" class="btn">
							View Details
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.projects-container {
		padding: clamp(2rem, 6vw, 4rem);
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.projects-container h1 {
		color: white;
		font-weight: 900;
		text-align: left;
		margin: 0 0 2rem 0;
		padding-left: 0;
		font-size: clamp(2rem, 5vw, 3rem);
	}
	
	.loading, .error, .no-projects {
		text-align: center;
		padding: 2rem;
		color: rgb(141, 141, 141);
	}
	
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
	
	.project-card {
		background-color: rgba(21, 21, 21, 0.8);
		border: 0.001rem solid rgb(25, 25, 25);
		border-radius: 8px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.project-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}
	
	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}
	
	.project-header h3 {
		margin: 0;
		padding-left: 0;
		flex: 1;
	}
	
	.project-link {
		color: white !important;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2rem;
		padding-left: 0 !important;
	}
	
	.project-link:hover {
		color: #60a5fa !important;
		transform: none;
	}
	
	.project-stats {
		display: flex;
		gap: 0.75rem;
		flex-shrink: 0;
	}
	
	.stat {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: rgb(141, 141, 141);
		font-size: 0.875rem;
	}
	
	.project-description {
		color: rgb(141, 141, 141);
		line-height: 1.6;
		margin: 0;
		padding-left: 0;
		flex: 1;
	}
	
	.project-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.language {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgb(141, 141, 141);
		font-size: 0.875rem;
	}
	
	.language-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color);
	}
	
	.updated {
		color: rgb(141, 141, 141);
		font-size: 0.875rem;
	}
	
	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.topic {
		background-color: rgba(25, 25, 25, 0.8);
		color: rgb(141, 141, 141);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		border: 1px solid rgb(25, 25, 25);
	}
	
	.project-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
	}
	
	.project-actions .btn {
		flex: 1;
		text-align: center;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		padding-left: 1rem !important;
	}
	
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.project-header {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.project-stats {
			align-self: flex-end;
		}
		
		.project-actions {
			flex-direction: column;
		}
	}
</style>
