/** @type {import('tailwindcss').Config} */
module.exports = {
    /**
     * FD content
     * **/
    content: ["./src/**/*.{html,js,ejs}"],

    /**
     * SD content
     * **/
    // content: ['./app/modules/**/*.php', './app/layout/**/*.php', './app/modules/!panel/**', './app/public/js/*.js'],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                black: "#161616",
            },
        },

        screens: {
            "xs": "360px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [],
};

