const { colors } = require("./src/util/themeSettings");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        "primary-light": colors["primay-light"],
        bg: "#e6e6e6",
        success: colors.success,
        danger: colors.danger,
      },
    },
  },
  plugins: [],
};
