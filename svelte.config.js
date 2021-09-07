import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
        "postcss": true
    })],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	// vite: {
	// 	ssr: {
	// 		external: [
	// 			/@babel\/runtime/,
	// 			'bn.js',
	// 			'borsh',
	// 			'bs58',
	// 			'buffer-layout',
	// 			'crypto-hash',
	// 			'jayson/lib/client/browser',
	// 			'js-sha3',
	// 			'node-fetch',
	// 			'rpc-websockets',
	// 			'secp256k1',
	// 			'superstruct',
	// 			'tweetnacl'
	// 		]
	// 	},
	// 	resolve: {
	// 		mainFields: ['browser', 'module', 'main', 'jsnext'],
	// 		dedupe: ['bn.js', 'buffer'],
	// 		extensions: ['.js', '.ts'],
	// 		preferBuiltins: false
	// 	}
	// }
};

export default config;
