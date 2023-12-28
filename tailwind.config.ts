import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				colorBlack: "rgb(var(--color-black) / <alpha-value>)",
				colorWhite: "rgb(var(--color-white) / <alpha-value>)",
				colorGreen: "rgb(var(--color-green) / <alpha-value>)",
			},
		},
	},
	plugins: [],
}
export default config
