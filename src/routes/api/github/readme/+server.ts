import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const owner = url.searchParams.get('owner');
	const repo = url.searchParams.get('repo');
	
	if (!owner || !repo) {
		return json({ error: 'Owner and repo parameters are required' }, { status: 400 });
	}

	try {
		// Try to fetch README from GitHub API
		const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'SvelteKit-App'
			}
		});

		if (!response.ok) {
			// If no README found, return empty content
			if (response.status === 404) {
				return json({ content: '', html_url: null });
			}
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const readmeData = await response.json();
		
		// Decode base64 content
		const content = Buffer.from(readmeData.content, 'base64').toString('utf-8');
		
		return json({
			content,
			html_url: readmeData.html_url
		});
	} catch (error) {
		console.error('Error fetching README:', error);
		return json({ error: 'Failed to fetch README' }, { status: 500 });
	}
};
