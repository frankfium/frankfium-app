import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('auth_token');

	if (authToken) {
		// In a real app, you'd validate the token (e.g., against a database session or by verifying a JWT)
		// For this example, we'll assume if the token (username) exists, it's valid.
		event.locals.user = { username: authToken };
	} else {
		event.locals.user = null;
	}

	// Protect routes starting with /adminOnly
	if (event.url.pathname.startsWith('/adminOnly') && !event.locals.user) {
		throw redirect(303, '/admin'); // Redirect to login page
	}

	// Protect other admin routes or APIs similarly if needed
	// if (event.url.pathname.startsWith('/api/admin/') && !event.locals.user) {
	//     return new Response('Unauthorized', { status: 401 });
	// }

	return resolve(event);
};