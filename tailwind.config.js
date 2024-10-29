/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: {
                    800: "#090C11",
                },
                "gray-custom": {
                    500: "#777B9B",
                },
                "blue-custom": {
                    100: "#B3D7FF",
                    200: "#80BFFF",
                    300: "#4DA8FF",
                    400: "#1A91FF",
                    500: "#0278FF",
                    600: "#0263CC",
                    700: "#0253A1",
                    800: "#024082",
                    900: "#012F66",
                },
                "purple-custom": {
                    100: "#E5A0D7",
                    200: "#D16DB7",
                    300: "#BB3B9B",
                    400: "#A535B2",
                    500: "#93319B",
                    600: "#831B87",
                    700: "#721872",
                    800: "#60155E",
                    900: "#4E124D",
                },
                "pink-custom": {
                    100: "#F5A2C8",
                    200: "#F57BAE",
                    300: "#F45794",
                    400: "#F4158C",
                    500: "#D70E7B",
                    600: "#B50C6B",
                    700: "#A40B61",
                    800: "#930A56",
                    900: "#82094B",
                },
            },
            borderColor: {
                "primary-gradient":
                    "linear-gradient(to bottom right, #0278FF 0%, #A535B2 58%, #F4158C 100%)",
            },
            backgroundImage: {
                "primary-gradient":
                    "linear-gradient(to bottom right, #0278FF 0%, #A535B2 58%, #F4158C 100%)",
                "primary-gradient-hover":
                    "linear-gradient(to bottom right, #005BB5 0%, #8D2E9E 58%, #D01275 100%)",
                "stroke-gradient":
                    "linear-gradient(to bottom right, #3F008E 0%, #930076 51%, #FF0058 100%)",
                "stroke-gradient-hover":
                    "linear-gradient(to bottom right, #0278FF 0%, #A535B2 58%, #F4158C 100%)",
            },
        },
    },
    plugins: [],
};
