import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#CCD9D9",
      secondary: "#12262B",
      greyBall: "#565B64",
      greyBackground: "#485654",
      lightGreyBackground: "#5B6466",
      lightBlue: "#E0FAFF",
      tealBall: "#07CDF3",
      darkerBlue: "#4D7775",
    },
  },
  plugins: [],
};
export default config;
