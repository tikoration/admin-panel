import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/types";
const Header = ({ handleOpen }: { handleOpen: () => void }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const userId = token && jwtDecode<DecodedToken>(token).id;
  const username = Cookies.get("username");
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        height={60}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ background: "#E5EDF4" }}
        padding={"10px 26px"}
        alignItems={"center"}
      >
        <Box onClick={handleOpen}>
          <MenuRoundedIcon sx={{ fontSize: "24px", cursor: "pointer" }} />
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Typography fontWeight={500} fontSize={12}>
            {userId}
          </Typography>
          {"-"}
          <Typography fontWeight={500} fontSize={12}>
            {username}
          </Typography>
          <IconButton onClick={handleClick}>
            <PersonIcon fontSize="large" />
          </IconButton>

          <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Header;
