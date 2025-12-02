import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./screens/Home";
import { Projects } from "./screens/Projects";
import { Admin } from "./screens/Admin";
import { Login } from "./screens/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/*",
    element: <Home />,
  },
]);

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};