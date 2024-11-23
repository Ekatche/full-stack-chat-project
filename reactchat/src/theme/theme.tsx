import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        }
    }
    interface ThemeOptions {
        primaryAppBar?: { // ? indicate that the argument is optional 
            height?: number;
        };
    }
}

export const createMuiTheme = () => {
    let theme = createTheme({
        typography: {
            fontFamily: ["Geist", "sans-serif"].join(","),

        },
        primaryAppBar: {
            height: 50,
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0
                }
            }
        }
    });
    theme = responsiveFontSizes(theme);
    return theme
}

export default createMuiTheme