/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        dark: {
          100: "#1E293B",
          200: "#0F172A",
          300: "#020617"
        }
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80')",
      }
    },
  },
  plugins: [],
}
