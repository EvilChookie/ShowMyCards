import { type Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [Typography],
  safelist: [
    "bg-blue-50",
    "bg-red-50",
    "bg-green-50",
    "bg-yellow-50",
    "dark:bg-blue-100",
    "dark:bg-red-100",
    "dark:bg-green-100",
    "dark:bg-yellow-100",
  ],
} satisfies Config;
