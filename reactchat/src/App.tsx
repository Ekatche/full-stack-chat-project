import router from "./routes"
import { RouterProvider } from "react-router-dom"
import "./theme/main.css"
import ToggleColorMode from "./components/ToggleColorMode";


const App: React.FC = () => {
  return (
    <ToggleColorMode >
      < RouterProvider router={router} />
    </ToggleColorMode>

  );
}


export default App
