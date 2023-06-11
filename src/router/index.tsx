import * as React from "react";

import type { RouteObject } from "react-router";
import { Navigate, useRoutes } from "react-router-dom";

import WrapperRouteComponent from "./config";
import Dashboard from "@/layouts";

const Home = React.lazy(() => import("@/pages/dashboard"));
const Documentation = React.lazy(() => import("@/pages/documentation"));
const NotFoundPage = React.lazy(() => import("@/pages/404"));
const RoutePermission = React.lazy(() => import("@/pages/permission/route"));
const Login = React.lazy(() => import("@/pages/login"));

const routeList: RouteObject[] = [
  {
    path: "/login",
    element: <WrapperRouteComponent element={<Login />} titleId="Login" />,
  },
  {
    path: "/",
    element: <WrapperRouteComponent element={<Dashboard />} titleId="" />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <WrapperRouteComponent element={<Home />} titleId="Dashboard" />,
      },
      {
        path: "documentation",
        element: <WrapperRouteComponent element={<Documentation />} titleId="Documentation" />,
      },
      {
        path: "permission/route",
        element: <WrapperRouteComponent element={<RoutePermission />} titleId="Forbidden" auth />,
      },
      {
        path: "*",
        element: <WrapperRouteComponent element={<NotFoundPage />} titleId="Not Found" />,
      },
    ],
  },
];

const RenderRouter: React.FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
