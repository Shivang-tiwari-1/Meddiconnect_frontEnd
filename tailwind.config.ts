export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryBlue: "#475be8",
        secondaryBlue: "#dadefa",
        hoverBlue: "#5367f5",
        primaryBlack: "#11142d",
        primaryGrey: "#808191",
        primaryGreen: "#2ed480",
        primaryRed: "#eb5757",
        primaryYellow: "#f2c94c",

        // Dark mode
        bgColorDarkBlack: "#111315",
        lightBlack: "#1a1d1f",
        textWhite: "#efefef",
        textGrey: "#6f767e",
      },
      screens: {
        maxMobile: { max: "374px" },
        mobile: { min: "375px", max: "429px" },  
        mobilexl: { min: "430px", max: "600px" },
        tablet: { min: "601px", max: "1023px" },
        laptop: { min: "1024px", max: "1279px" },
        desktop: "1280px",  
      },
      fontFamily: {
        apple: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "apple-lg": "18px",
      },
      letterSpacing: {
        tighter: "0.02em",
      },
      backgroundColor: ["disabled"],
      cursor: ["disabled"],
    },
    keyframes: {
      slideDown: {
        "0%": { transform: "translateY(-100%)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      fadeInScale: {
        "0%": { transform: "scale(0.8)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
    },
    animation: {
      slideDown: "slideDown 1s ease-out",
      fadeInScale: "fadeInScale 1s ease-out forwards",
    },
    scrollBehavior: ["responsive"],
  },
  plugins: [],
  darkMode: "class",
};
