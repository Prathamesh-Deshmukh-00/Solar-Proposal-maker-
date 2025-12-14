/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'teal-primary': '#1a7f7f',
                'teal-accent': '#2dd4bf',
            },
        },
    },
    plugins: [],
}
