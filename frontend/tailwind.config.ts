/** @type {import('tailwindcss').Config} */

const mode = process.env["TAILWIND_MODE"] ? 'jit' : 'aot';
module.exports = {
  mode: mode,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

