import * as React from "react";

import type { RouteObject } from "react-router";
import { Navigate, useRoutes } from "react-router-dom";

import WrapperRouteComponent from "./config";
import Dashboard from "@/layouts";

const Home = React.lazy(() => import("@/pages/dashboard"));
const NotFoundPage = React.lazy(() => import("@/pages/404"));
const RoutePermission = React.lazy(() => import("@/pages/permission/route"));
const Login = React.lazy(() => import("@/pages/login"));

const Users = React.lazy(() => import("@/pages/web-management/users/list"));
const FormUsers = React.lazy(() => import("@/pages/web-management/users/create-update"));

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
        element: <WrapperRouteComponent element={<Home />} titleId="Dashboard" auth />,
      },
      {
        path: "web-management/",
        children: [
          {
            path: "users",
            element: <WrapperRouteComponent element={<Users />} titleId="Categories" auth />,
          },
          {
            path: "users/add",
            element: <WrapperRouteComponent element={<FormUsers />} titleId="Add User" auth />,
          },
          {
            path: "users/:id",
            element: <WrapperRouteComponent element={<FormUsers />} titleId="Update User" auth />,
          },
        ],
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
