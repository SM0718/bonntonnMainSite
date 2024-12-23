/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
const { nextui } = require("@nextui-org/react");
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  darkMode: "class",
  plugins: [
      daisyui,
      require("tailwindcss-animate"),
      nextui()
],
}

