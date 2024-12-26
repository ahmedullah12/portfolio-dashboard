import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Skills from "../pages/Skills";
import Blogs from "@/pages/Blogs";
import Projects from "@/pages/Projects";
import AddProject from "@/pages/AddProject";
import EditProject from "@/pages/EditProject";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Experiences from "@/pages/Experiences";
import AddExperience from "@/pages/AddExperience";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Skills />
          </ProtectedRoute>
        ),
      },
      {
        path: "blogs",
        element: (
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-project",
        element: (
          <ProtectedRoute>
            <AddProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-project/:id",
        element: (
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "experiences",
        element: (
          <ProtectedRoute>
            <Experiences />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-experience",
        element: (
          <ProtectedRoute>
            <AddExperience />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
