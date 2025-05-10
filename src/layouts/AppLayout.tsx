import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const AppLayout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box height={"100%"} display={"flex"} flexDirection={"column"}>
      <Header handleOpen={handleOpen} />

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",

          padding: {
            xs: "25px",
            md: "40px 40px 40px 283px",
          },
        }}
      >
        <Sidebar
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
