/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: {
          light: "hsl(var(--background))",
          dark: "hsl(var(--border-dark))",
        },
        input: {
          light: "hsl(var(--foreground))",
          dark: "hsl(var(--foreground-dark))",
        },
        ring: {
          light: "hsl(var(--ring))",
          dark: "hsl(var(--ring-dark))",
        },
        background: {
          light: "hsl(var(--background))",
          dark: "hsl(var(--background-dark))",
        },
        foreground: {
          light: "hsl(var(--foreground))",
          dark: "hsl(var(--foreground-dark))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: {
            light: "hsl(var(--primary-foreground))",
            dark: "hsl(var(--primary-foreground-dark))",
          },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: {
            light: "hsl(var(--secondary-foreground))",
            dark: "hsl(var(--secondary-foreground-dark))",
          },
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: {
            light: "hsl(var(--destructive-foreground))",
            dark: "hsl(var(--destructive-foreground-dark))",
          },
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: {
            light: "hsl(var(--muted-foreground))",
            dark: "hsl(var(--muted-foreground-dark))",
          },
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: {
            light: "hsl(var(--accent-foreground))",
            dark: "hsl(var(--accent-foreground-dark))",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: {
            light: "hsl(var(--popover-foreground))",
            dark: "hsl(var(--popover-foreground-dark))",
          },
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: {
            light: "hsl(var(--card-foreground))",
            dark: "hsl(var(--card-foreground-dark))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
