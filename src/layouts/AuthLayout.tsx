import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import theme from "../theme/theme";

const AuthLayout = () => {
  const token = Cookies.get("token");
  if (token) return <Navigate to="/captions" />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box
        component={"main"}
        sx={{
          maxWidth: "300px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "40px",
          paddingTop: "32px",
          mt: "150px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <PersonIcon
            fontSize="large"
            sx={{ color: theme.palette.primary.dark }}
          />
          <Typography fontSize={"18px"} color={theme.palette.grey[700]}>
            Admin Portal
          </Typography>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
