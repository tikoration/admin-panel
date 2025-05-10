import { Navigate } from "react-router-dom";
import WithAxios from "../components/WithAxios";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import Captions from "../features/captions/Captions";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Countries from "../features/countries/Countries";

export const routes = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <SignUp />,
        path: "/register",
      },
    ],
  },
  {
    element: (
      <WithAxios>
        <AppLayout />
      </WithAxios>
    ),
    children: [
      {
        element: <Navigate to={"/captions"} replace />,
        path: "/",
      },
      {
        element: <Captions />,
        path: "/captions",
      },
      { element: <Countries />, path: "/countries" },
    ],
  },
];
