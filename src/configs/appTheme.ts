import { responsiveFontSizes, createTheme } from "@mui/material";

const appTheme = responsiveFontSizes(
    createTheme({
        breakpoints: {
            values: {
                xs: 100,
                sm: 400,
                md: 600,
                lg: 900,
                xl: 1200
            }
        },
        // palette: {
        //     mode: 'dark',
        //     primary: {
        //         main: "#00AEFF"
        //     },
        //     secondary: {
        //         main: "#FFD14A"
        //     },
        //     background: {
        //         paper: "#191919",
        //         default: "#121212"
        //     }
        // },
        typography: {
            fontFamily:
                "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
            h1: { 
                fontWeight: 800,
            },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 800 },
            h4: {
                fontWeight: 700
            },
            h5: {
                fontWeight: 700
            },
            h6: {
                fontWeight: 700
            },

        }
    })
);

export default appTheme;