import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'@': path.resolve('./src')
				}
			},

			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/styles/variables.scss" as *;'
					}
				}
			}
		}
	},

	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/styles/variables.scss" as *;'
			}
		})
	]
};

export default config;
