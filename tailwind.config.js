/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/public/images/login-background.jpg')",
        "home-background": "url('/public/images/home-background.png')",
      },
      height: {
        124: "28rem",
        128: "32rem",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
