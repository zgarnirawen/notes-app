/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // Tous les fichiers du dossier app
    "./src/components/**/*.{js,ts,jsx,tsx}", // Tous les composants
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
