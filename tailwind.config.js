/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"bookshelf-primary": "#00B0FF",
				"bookshelf-dark": "#0C0C0C",
				"bookshelf-light": "#F0F0F0",
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
