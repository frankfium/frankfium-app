import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params;
	
	try {
		// GitHub username
		const username = 'frankfium';
		
		// Fetch repository details
		const repoResponse = await fetch(`https://api.github.com/repos/${username}/${slug}`, {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'SvelteKit-App'
			}
		});
		
		if (!repoResponse.ok) {
			throw new Error('Repository not found');
		}
		
		const repo = await repoResponse.json();
		
		// Fetch README content
		const readmeResponse = await fetch(`/api/github/readme?owner=${username}&repo=${slug}`);
		let readme = null;
		
		if (readmeResponse.ok) {
			readme = await readmeResponse.json();
		}
		
		return {
			repo,
			readme: readme?.content || null,
			readmeUrl: readme?.html_url || null
		};
	} catch (error) {
		console.error('Error loading project:', error);
		throw error;
	}
};
