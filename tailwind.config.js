/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "source-sans": ["Source Sans Pro", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.075em",
        "ultra-wide": "0.25em",
      },
      lineHeight: {
        "extra-loose": "2.5",
      },
    },
  },
};
