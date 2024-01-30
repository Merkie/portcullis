/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['FixelText', 'sans-serif']
		},
		extend: {
			fontFamily: {
				display: 'FixelDisplay, sans-serif'
			}
		}
	},
	plugins: []
};
