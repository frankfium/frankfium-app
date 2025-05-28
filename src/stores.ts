import { writable } from 'svelte/store';

// User store: null if not logged in, or an object with user details if logged in.
export const user = writable<{ username: string } | null>(null);