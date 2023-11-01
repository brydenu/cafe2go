/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            red: colors.red,
            yellow: colors.yellow,
            white: colors.white,
            gray: colors.gray,
            blue: colors.blue,
            green: colors.green,
            emerald: colors.emerald,
            primary: "#403636",
            secondary: "#8f7b7b",
            accent: "#ded881",
            background: "#f8f1eb",
        },
    },
    plugins: [],
};
