import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Fetch repositories for frankfium
		const response = await fetch('/api/github/repos?username=frankfium');
		
		if (!response.ok) {
			throw new Error('Failed to fetch repositories');
		}
		
		const repos = await response.json();
		return {
			repos
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		return {
			repos: []
		};
	}
};
