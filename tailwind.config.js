/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#AD1FEA",
				secondary: "#4661e6",
				plaeBlue: "#F2F4FF",
				paleWhite: "#F7F8FD",
				textPrimary: "#373f68",
				textSecondary: "#3A4374",
				paleGray: "#646186",
				danger: "#F49F85",
				skyBlue: "#62BCFA",
			},
		},
	},
	plugins: [],
};
