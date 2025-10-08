<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	
	export let data: PageData;
	
	let { repo, readme, readmeUrl } = data;
	let readmeHtml = '';
	let loading = true;
	
	onMount(async () => {
		if (readme) {
			// Configure marked for better security and styling
			marked.setOptions({
				breaks: true,
				gfm: true
			});
			
			readmeHtml = await marked(readme);
		}
		loading = false;
	});
	
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	function formatFileSize(bytes: number): string {
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		if (bytes === 0) return '0 Bytes';
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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
	<title>{repo.name} - Frank's Portfolio</title>
	<meta name="description" content={repo.description || `Project: ${repo.name}`} />
</svelte:head>

<div class="project-detail-container">
	<div class="project-header">
		<div class="breadcrumb">
			<a href="/projects" class="breadcrumb-link">Projects</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">{repo.name}</span>
		</div>
		
		<div class="project-title-section">
			<h1>{repo.name}</h1>
			{#if repo.description}
				<p class="project-description">{repo.description}</p>
			{/if}
		</div>
		
		<div class="project-actions">
			<a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="btn primary">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				View on GitHub
			</a>
			
			{#if repo.homepage}
				<a href={repo.homepage} target="_blank" rel="noopener noreferrer" class="btn">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
					</svg>
					Live Demo
				</a>
			{/if}
		</div>
	</div>
	
	<div class="project-content">
		<div class="project-sidebar">
			<div class="info-card">
				<h3>Project Info</h3>
				
				<div class="info-item">
					<span class="info-label">Language</span>
					{#if repo.language}
						<span class="language" style="--color: {getLanguageColor(repo.language)}">
							<span class="language-dot"></span>
							{repo.language}
						</span>
					{:else}
						<span class="no-data">Not specified</span>
					{/if}
				</div>
				
				<div class="info-item">
					<span class="info-label">Size</span>
					<span>{formatFileSize(repo.size * 1024)}</span>
				</div>
				
				<div class="info-item">
					<span class="info-label">Created</span>
					<span>{formatDate(repo.created_at)}</span>
				</div>
				
				<div class="info-item">
					<span class="info-label">Last Updated</span>
					<span>{formatDate(repo.updated_at)}</span>
				</div>
				
				<div class="info-item">
					<span class="info-label">Stars</span>
					<span>{repo.stargazers_count}</span>
				</div>
				
				<div class="info-item">
					<span class="info-label">Forks</span>
					<span>{repo.forks_count}</span>
				</div>
				
				<div class="info-item">
					<span class="info-label">Issues</span>
					<span>{repo.open_issues_count}</span>
				</div>
			</div>
			
			{#if repo.topics && repo.topics.length > 0}
				<div class="topics-card">
					<h3>Topics</h3>
					<div class="topics">
						{#each repo.topics as topic}
							<span class="topic">{topic}</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		
		<div class="project-main">
			{#if loading}
				<div class="loading">
					<p>Loading project details...</p>
				</div>
			{:else if readmeHtml}
				<div class="readme-section">
					<div class="readme-header">
						<h2>README</h2>
						{#if readmeUrl}
							<a href={readmeUrl} target="_blank" rel="noopener noreferrer" class="readme-link">
								View on GitHub
							</a>
						{/if}
					</div>
					<div class="readme-content">
						{@html readmeHtml}
					</div>
				</div>
			{:else}
				<div class="no-readme">
					<p>No README available for this project.</p>
					<a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="btn">
						View on GitHub for more details
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.project-detail-container {
		padding: clamp(2rem, 6vw, 4rem);
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		color: rgb(141, 141, 141);
		font-size: 0.875rem;
	}
	
	.breadcrumb-link {
		color: white !important;
		text-decoration: none;
		padding-left: 0 !important;
	}
	
	.breadcrumb-link:hover {
		color: #60a5fa !important;
		transform: none;
	}
	
	.breadcrumb-separator {
		color: rgb(141, 141, 141);
	}
	
	.breadcrumb-current {
		color: rgb(141, 141, 141);
	}
	
	.project-title-section h1 {
		color: white;
		font-weight: 900;
		margin: 0 0 1rem 0;
		padding-left: 0;
		font-size: clamp(2rem, 5vw, 3rem);
	}
	
	.project-description {
		color: rgb(141, 141, 141);
		font-size: 1.125rem;
		line-height: 1.6;
		margin: 0 0 2rem 0;
		padding-left: 0;
	}
	
	.project-actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	
	.project-actions .btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 500;
		transition: all 0.2s ease;
		padding-left: 1.5rem !important;
	}
	
	.project-actions .btn.primary {
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.project-actions .btn.primary:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}
	
	.project-content {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		align-items: start;
	}
	
	.project-sidebar {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.info-card, .topics-card {
		background-color: rgba(21, 21, 21, 0.8);
		border: 0.001rem solid rgb(25, 25, 25);
		border-radius: 8px;
		padding: 1.5rem;
	}
	
	.info-card h3, .topics-card h3 {
		color: white;
		margin: 0 0 1rem 0;
		padding-left: 0;
		font-size: 1.125rem;
		font-weight: 600;
	}
	
	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(25, 25, 25, 0.5);
	}
	
	.info-item:last-child {
		border-bottom: none;
	}
	
	.info-label {
		color: rgb(141, 141, 141);
		font-weight: 500;
	}
	
	.info-item span:not(.info-label) {
		color: white;
		font-weight: 400;
	}
	
	.language {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.language-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color);
	}
	
	.no-data {
		color: rgb(141, 141, 141) !important;
		font-style: italic;
	}
	
	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.topic {
		background-color: rgba(25, 25, 25, 0.8);
		color: rgb(141, 141, 141);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		border: 1px solid rgb(25, 25, 25);
	}
	
	.project-main {
		min-width: 0;
	}
	
	.readme-section {
		background-color: rgba(21, 21, 21, 0.8);
		border: 0.001rem solid rgb(25, 25, 25);
		border-radius: 8px;
		overflow: hidden;
	}
	
	.readme-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid rgba(25, 25, 25, 0.5);
	}
	
	.readme-header h2 {
		color: white;
		margin: 0;
		padding-left: 0;
		font-size: 1.25rem;
		font-weight: 600;
	}
	
	.readme-link {
		color: #60a5fa !important;
		text-decoration: none;
		font-size: 0.875rem;
		padding-left: 0 !important;
	}
	
	.readme-link:hover {
		text-decoration: underline;
		transform: none;
	}
	
	.readme-content {
		padding: 1.5rem;
		color: rgb(141, 141, 141);
		line-height: 1.6;
	}
	
	.readme-content :global(h1),
	.readme-content :global(h2),
	.readme-content :global(h3),
	.readme-content :global(h4),
	.readme-content :global(h5),
	.readme-content :global(h6) {
		color: white;
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-left: 0;
	}
	
	.readme-content :global(h1:first-child),
	.readme-content :global(h2:first-child),
	.readme-content :global(h3:first-child) {
		margin-top: 0;
	}
	
	.readme-content :global(p) {
		margin-bottom: 1rem;
		padding-left: 0;
	}
	
	.readme-content :global(code) {
		background-color: rgba(25, 25, 25, 0.8);
		color: #f8f8f2;
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-size: 0.875rem;
	}
	
	.readme-content :global(pre) {
		background-color: rgba(25, 25, 25, 0.8);
		border: 1px solid rgb(25, 25, 25);
		border-radius: 6px;
		padding: 1rem;
		overflow-x: auto;
		margin: 1rem 0;
	}
	
	.readme-content :global(pre code) {
		background: none;
		padding: 0;
	}
	
	.readme-content :global(blockquote) {
		border-left: 4px solid #60a5fa;
		padding-left: 1rem;
		margin: 1rem 0;
		color: rgb(141, 141, 141);
	}
	
	.readme-content :global(ul),
	.readme-content :global(ol) {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}
	
	.readme-content :global(li) {
		margin-bottom: 0.25rem;
		padding-left: 0;
	}
	
	.readme-content :global(a) {
		color: #60a5fa;
		text-decoration: none;
	}
	
	.readme-content :global(a:hover) {
		text-decoration: underline;
	}
	
	.readme-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}
	
	.readme-content :global(th),
	.readme-content :global(td) {
		border: 1px solid rgba(25, 25, 25, 0.5);
		padding: 0.5rem;
		text-align: left;
	}
	
	.readme-content :global(th) {
		background-color: rgba(25, 25, 25, 0.5);
		color: white;
		font-weight: 600;
	}
	
	.no-readme {
		text-align: center;
		padding: 3rem;
		color: rgb(141, 141, 141);
	}
	
	.no-readme p {
		margin-bottom: 1.5rem;
		padding-left: 0;
	}
	
	.loading {
		text-align: center;
		padding: 2rem;
		color: rgb(141, 141, 141);
	}
	
	@media (max-width: 1024px) {
		.project-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.project-sidebar {
			order: 2;
		}
		
		.project-main {
			order: 1;
		}
	}
	
	@media (max-width: 768px) {
		.project-actions {
			flex-direction: column;
		}
		
		.project-actions .btn {
			justify-content: center;
		}
		
		.readme-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
