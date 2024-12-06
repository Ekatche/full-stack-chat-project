import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        };
        primaryDraw: {
            width: number;
            closed: number;
        };
        SecondaryDraw: {
            width: number;
        }
    }
    interface ThemeOptions {
        primaryAppBar?: { // ? indicate that the argument is optional 
            height?: number;
        };
        primaryDraw: {
            width: number;
            closed: number;
        };
        SecondaryDraw: {
            width: number;
        }
    }
}

export const createMuiTheme = (mode: "light" | "dark") => {
    let theme = createTheme({
        typography: {
            fontFamily: ["Geist", "sans-serif"].join(","),
            body1: {
                fontweigth: 500,
                letterSpacing: "-0.5px"
            },
            body2: {
                fontweigth: 500,
                fontSize: "15px",
                letterSpacing: "-0.5px"
            },
        },
        primaryDraw: {
            width: 240,
            closed: 70
        },
        SecondaryDraw: {
            width: 240,
        }
        ,
        primaryAppBar: {
            height: 50,
        },
        palette: {
            mode,
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0
                },
            },
        },
    });
    theme = responsiveFontSizes(theme);
    return theme
}

export default createMuiTheme