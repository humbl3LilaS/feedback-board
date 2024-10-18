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
				textSecondary: "#373f68",
				textPrimary: "#3A4374",
				paleGray: "#646186",
				danger: "#F49F85",
				skyBlue: "#62BCFA",
			},
			backgroundImage: {
				mobile: "url('/assets/background/background-header-mobile.png')",
				tablet: "url('/assets/background/background-header-tablet.png')",
			},
			height: {
				sidebar: "calc(100vh - 76px)",
			},
		},
	},
	plugins: [],
};
