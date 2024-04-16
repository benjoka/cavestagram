module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "media-mask": "url('../images/posts/media_mask.png')",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        wiggle: "wiggle 4s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0)" },
          "70%": { transform: "rotate(0)" },
          "75%": { transform: "rotate(3deg)" },
          "80%": { transform: "rotate(-3deg)" },
          "85%": { transform: "rotate(3deg)" },
          "90%": { transform: "rotate(-3deg)" },
          "95%": { transform: "rotate(0)" },
        },
      },
    },
  },
  plugins: [],
};
