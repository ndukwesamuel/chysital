/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{  
        "DesaturatedDarkCyan": "hsl(180, 29%, 50%)", //Desaturated Dark Cyan
       "LightGrayishCyan": "hsl(180, 52%, 96%)", //Background
       "filterGrayishCyan": "hsl(180, 31%, 95%)", //filter tablets
       "DarkGrayCyan": "hsl(180, 8%, 52%)", //dark gray cyan
       "VeryDarkGrayCyan": "hsl(180, 14%, 20%)", //very dark cyan
      }
    },
  },
  plugins: [],
}

