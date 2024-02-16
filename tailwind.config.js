/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        textColor: "-1px 2px 6px rgba(2, 48, 71, 0.54)",
      },
      backgroundColor: {
        "bg-color":
          "linear-gradient(90deg, rgba(0, 204, 255, 1) 0%, rgba(115, 33,188, 1) 100%)",
      },
    },
  },

  plugins: [],
};
