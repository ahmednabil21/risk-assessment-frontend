/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // ✅ لتفعيل الثيم الليلي باستخدام class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'], // ✅ استخدام خط Cairo كافتراضي
      },
      colors: {
        primary: "#4f45e4",
        secondary: "#facc15",
        dark: "#1f2937",
        light: "#f3f4f6"
      },
    },
  },
  plugins: [],
}