import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		 paths: {
			base: process.env.NODE_ENV === 'production' ? '' : '',
		}
	}
};

export default config;
