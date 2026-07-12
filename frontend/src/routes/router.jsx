import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import DashboardRoute from "./DashboardRoute";

const basename = import.meta.env.BASE_URL === "/"
  ? "/"
  : import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "dashboard/",
        Component: DashboardRoute,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login/",
        Component: Login,
      },
      {
        path: "register/",
        Component: Register,
      }
    ]
  },
], { basename });
