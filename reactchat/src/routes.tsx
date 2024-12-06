import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                element={<Home />}
                path="/"
            />
            <Route
                element={<Explore />}
                path="/explore/:categoryName"
            />
        </Route>
    )
);



export default router;