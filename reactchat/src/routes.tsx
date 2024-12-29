import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                element={<Home />}
                path="/"
            />
            <Route
                element={<Server />}
                path="/server/:serverId/:channelId?"
            />
            <Route
                element={<Explore />}
                path="/explore/:categoryName"
            />
        </Route>
    )
);



export default router;