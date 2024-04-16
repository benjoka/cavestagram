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
        "wiggle-immediate": "wiggle 2s linear infinite",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flash: "flash 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "wiggle-immediate": {
          "0%": { transform: "rotate(3deg)" },
          "5%": { transform: "rotate(-3deg)" },
          "10%": { transform: "rotate(3deg)" },
          "15%": { transform: "rotate(-3deg)" },
          "20%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(0)" },
        },
        wiggle: {
          "0%": { transform: "rotate(0)" },
          "70%": { transform: "rotate(0)" },
          "75%": { transform: "rotate(3deg)" },
          "80%": { transform: "rotate(-3deg)" },
          "85%": { transform: "rotate(3deg)" },
          "90%": { transform: "rotate(-3deg)" },
          "95%": { transform: "rotate(0)" },
        },
        "pulse-soft": {
          "0 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        flash: {
          "0%": { opacity: "0" },
          "81%": { opacity: "0" },
          "83%": { opacity: "0.1" },
          "84%": { opacity: "0" },
          "85%": { opacity: "0.1" },
          "86%": { opacity: "0.05" },
          "87%": { opacity: "0.1" },
          "95%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
