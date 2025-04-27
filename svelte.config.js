import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Use the Node adapter for Azure App Service deployment
		adapter: adapter({
			out: 'build' // Output directory for the build
		})
	}
};

export default config;
