import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Skills from "../pages/Skills";
import Blogs from "@/pages/Blogs";
import Projects from "@/pages/Projects";
import AddProject from "@/pages/AddProject";
import EditProject from "@/pages/EditProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Skills />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      },
      {
        path: "edit-project/:id",
        element: <EditProject />,
      },
    ],
  },
]);

export default router;
