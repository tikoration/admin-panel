import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Box>Project 123</Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
