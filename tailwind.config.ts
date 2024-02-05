import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1042px",
      xl: "1440px",
      cb: "1200px",
    },
    colors: {
      red: "#ff0000",
      white: "#ffffff",
      gray: "#283030CC",
      aqua: "#2CBFCA",
      yellow: "#ea920f",
      lightyellow: "#ffe979",
      dark: "#283030",
      darkgray: "#28303099",
      lightgray: "rgb(40 48 48 / 40%)",
      yellowwhite: "#fff5e6",
      black: "#000",
      textgray: "rgb(40 48 48 / 70%)",
      lightAqua: "#363f3f",
      green: "#2cca4f",
      lightblue: "#e2f8ff",
      light: "#F4F4F4",
      greysixty: "rgb(40 48 48 / 60%)",
      greyten: "rgb(40 48 48 / 10%)",
      greyEighty: "rgb(40 48 48 / 80%)",
      greyborder: "#E1E1E1",
      greyThirty: "rgb(40 48 48 / 30%)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
};
export default config;
