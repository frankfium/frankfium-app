import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	clone_url: string;
	language: string | null;
	topics: string[];
	created_at: string;
	updated_at: string;
	pushed_at: string;
	size: number;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	default_branch: string;
	homepage: string | null;
	archived: boolean;
	disabled: boolean;
	private: boolean;
}

export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');
	
	if (!username) {
		return json({ error: 'Username parameter is required' }, { status: 400 });
	}

	try {
		// Fetch repositories from GitHub API
		const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'SvelteKit-App'
			}
		});

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos: GitHubRepo[] = await response.json();
		
		// Filter out private and archived repositories, and sort by updated date
		const publicRepos = repos
			.filter(repo => !repo.private && !repo.archived)
			.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

		return json(publicRepos);
	} catch (error) {
		console.error('Error fetching GitHub repositories:', error);
		return json({ error: 'Failed to fetch repositories' }, { status: 500 });
	}
};
