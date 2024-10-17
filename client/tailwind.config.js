/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				"fs-xs": "clamp(11.11px, 0.09vi + 10.81px, 12.16px)",
				"fs-sm": "clamp(13.33px, 0.17vi + 12.8px, 15.2px)",
				"fs-base": "clamp(16px, 0.27vi + 15.14px, 19px)",
				"fs-md": "clamp(19.2px, 0.41vi + 17.9px, 23.75px)",
				"fs-lg": "clamp(23.04px, 0.59vi + 21.14px, 29.69px)",
				"fs-xl": "clamp(27.65px, 0.84vi + 24.94px, 37.11px)",
				"fs-xxl": "clamp(33.18px, 1.18vi + 29.4px, 46.39px)",
				"fs-xxxl": "clamp(39.81px, 1.62vi + 34.62px, 57.98px)",
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
