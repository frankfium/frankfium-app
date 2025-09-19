import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const envUsername = env['user'];
const envPassword = env['password'];

export const POST: RequestHandler = async ({ request, cookies }) => {
    let body;
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    try {
        body = await request.json();
    } catch (e) {
        return json({ status: 'Bad Request', message: 'Invalid JSON body' }, { status: 400 });
    }

    const { username, password } = body;

    // Basic validation for username and password
    if (typeof username !== 'string' || typeof password !== 'string') {
        return json({ status: 'Bad Request', message: 'Username and password must be strings' }, { status: 400 });
    }

    if (typeof envUsername !== 'string' || typeof envPassword !== 'string') {
        return json({ status: 'Server Error', message: 'Authentication is not configured' }, { status: 500 });
    }

    if (username !== envUsername || password !== envPassword) {
        return json({ status: 'Unauthorized' }, { status: 401 });
    }

    // Set a secure, HTTP-only cookie
    cookies.set('auth_token', username, { // Storing username directly for simplicity; in production, use a session ID or JWT
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax',
        maxAge: sevenDaysInSeconds, // Cookie expiry (e.g., 7 days)
    });

    // Include a user property in the response
    return json({ status: 'Logged in', user: { username } }, { status: 200 });
};
