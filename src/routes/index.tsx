import { Navigate } from "react-router-dom";
import WithAxios from "../components/WithAxios";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import Captions from "../features/captions/Captions";
import AppLayout from "../layouts/AppLayout";

export const routes = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/register",
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
    ],
  },
];
