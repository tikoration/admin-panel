import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const token = Cookies.get("token");
  if (token) return <Navigate to="/captions" />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    ></Box>
  );
};

export default AuthLayout;
