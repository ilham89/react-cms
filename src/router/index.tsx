import * as React from "react";

import type { RouteObject } from "react-router";
import { Navigate, useRoutes } from "react-router-dom";

import WrapperRouteComponent from "./config";
import Dashboard from "@/layouts";

const Home = React.lazy(() => import("@/pages/dashboard"));
const NotFoundPage = React.lazy(() => import("@/pages/404"));
const RoutePermission = React.lazy(() => import("@/pages/permission/route"));
const Login = React.lazy(() => import("@/pages/login"));
const Products = React.lazy(() => import("@/pages/products"));
const FaqCategories = React.lazy(() => import("@/pages/web-management/faq/categories/list"));
const FormFaqCategories = React.lazy(
  () => import("@/pages/web-management/faq/categories/create-update"),
);
const Faq = React.lazy(() => import("@/pages/web-management/faq/list"));
const FaqQuestion = React.lazy(() => import("@/pages/web-management/faq/create-update"));

const ContactUs = React.lazy(() => import("@/pages/web-management/contact-us/list"));

const TermsCondition = React.lazy(
  () => import("@/pages/web-management/terms-policy/terms-condition"),
);
const PrivacyPolicy = React.lazy(
  () => import("@/pages/web-management/terms-policy/privacy-policy"),
);
const ReturnPolicy = React.lazy(() => import("@/pages/web-management/terms-policy/return-policy"));

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
            path: "faq/categories",
            element: (
              <WrapperRouteComponent element={<FaqCategories />} titleId="Categories" auth />
            ),
          },
          {
            path: "faq/categories/add",
            element: (
              <WrapperRouteComponent element={<FormFaqCategories />} titleId="Add Category" auth />
            ),
          },
          {
            path: "faq",
            element: <WrapperRouteComponent element={<Faq />} titleId="Faq" auth />,
          },
          {
            path: "faq/add",
            element: (
              <WrapperRouteComponent element={<FaqQuestion />} titleId="Add Question" auth />
            ),
          },
          {
            path: "contact-us",
            element: <WrapperRouteComponent element={<ContactUs />} titleId="Contact Us" auth />,
          },
          {
            path: "terms-policy/terms-condition",
            element: (
              <WrapperRouteComponent element={<TermsCondition />} titleId="Terms Condition" auth />
            ),
          },
          {
            path: "terms-policy/privacy-policy",
            element: (
              <WrapperRouteComponent element={<PrivacyPolicy />} titleId="Privacy Policy" auth />
            ),
          },
          {
            path: "terms-policy/return-policy",
            element: (
              <WrapperRouteComponent element={<ReturnPolicy />} titleId="Return Policy" auth />
            ),
          },
        ],
      },
      {
        path: "products",
        element: <WrapperRouteComponent element={<Products />} titleId="Products" auth />,
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
