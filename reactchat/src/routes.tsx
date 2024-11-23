import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                element={<Home />}
                path="/"
            />
        </Route>
    )
);



export default router;