import router from "./routes"
import { RouterProvider } from "react-router-dom"
import createMuiTheme from "./theme/theme"
import { ThemeProvider } from "@mui/material/styles";
import "./theme/main.css"
const App: React.FC = () => {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      < RouterProvider router={router} />
    </ThemeProvider>

  );
}


export default App
