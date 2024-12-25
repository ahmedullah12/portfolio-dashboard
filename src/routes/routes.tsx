import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Skills from "../pages/Skills";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Skills/>
            }
        ]
    }
]);

export default router;