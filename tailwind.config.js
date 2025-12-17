/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'teal-primary': '#02746A',
                'teal-accent': '#2dd4bf',
            },
        },
    },
    plugins: [],
}
