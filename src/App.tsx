import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./screens/Home";
import { Projects } from "./screens/Projects";

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
    path: "/*",
    element: <Home />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};