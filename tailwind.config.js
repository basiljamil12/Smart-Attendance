/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "sa-maroon": "#925454",
        "sa-pink": "#FFE3E3",
        "sa-grey": "#D9D9D9",
        "sa-blue": "#345CC3",
        "sa-black":"#404040",
        "sa-table-blue":"#0047FF",
        "toast-invalid": "#B0233A",
        "toast-invalid-back": "#FAE5E9",
        "toast-invalid-brd" : "#F5CCD3",
        "toast-error": "#A37313",
        "toast-error-back": "#FBF2DE",
        "toast-error-brd": "#F7E4BE",
        "toast-success": "#0E7537",
        "toast-success-back": "#D6FAE4",
        "toast-success-brd": "#AFE9C5",
      },
    },
  },
  plugins: [],
};
