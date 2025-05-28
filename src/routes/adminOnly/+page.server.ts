import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		// This should ideally be caught by the hook already,
		// but it's a good safeguard.
		throw redirect(303, '/admin');
	}

	// Pass the user data to the page
	return { user: locals.user };
};