import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";

export const routes = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <SignUp />,
    path: "/register",
  },
];
