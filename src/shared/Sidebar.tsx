import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import theme from "../theme/theme";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ClosedCaptionOffIcon from "@mui/icons-material/ClosedCaptionOff";
import PublicIcon from "@mui/icons-material/Public";
interface IsidebarDrawer {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}
const Sidebar = ({ open, handleOpen, handleClose }: IsidebarDrawer) => {
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));

  const pages = [
    {
      value: "Captions",
      route: "/captions",
      icon: <ClosedCaptionOffIcon />,
    },
    {
      value: "Countries",
      route: "/countries",
      icon: <PublicIcon />,
    },
  ];

  return (
    <>
      <Box>
        <Drawer
          open={open}
          onClose={() => {
            handleOpen();
          }}
          sx={{
            "& .MuiPaper-root": {
              width: "250px",
            },
          }}
          variant={isMiddleScreen ? "temporary" : "permanent"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                borderBottom: `1px solid grey`,
                paddingBottom: "8px",
                justifyContent: "center",
              }}
            >
              <AdminPanelSettingsIcon color="primary" fontSize="large" />
              <Typography fontSize="14px">Admin Panel</Typography>
            </Box>
            <List>
              {pages.map((item) => (
                <ListItem
                  key={item.value}
                  sx={{ borderRadius: "5px" }}
                  disablePadding
                >
                  <NavLink
                    onClick={isMiddleScreen ? handleClose : undefined}
                    id={item.value}
                    to={`${item.route}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    {({ isActive }) => (
                      <Box
                        display={"flex"}
                        padding={"12px 16px"}
                        alignItems={"center"}
                        height={"40px"}
                        borderRadius={"5px"}
                        sx={{
                          background: isActive ? "#F0EFF2" : "transparent",
                          ":hover": {
                            "& .MuiListItemIcon-root": {
                              svg: {
                                path: {
                                  fill: theme.palette.primary.main,
                                },
                              },
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "38px",
                            svg: {
                              path: {
                                fill: isActive
                                  ? theme.palette.primary.main
                                  : theme.palette.grey[400],
                                ":hover": {
                                  fill: isActive
                                    ? theme.palette.primary.main
                                    : "",
                                },
                              },
                            },
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            fontSize: 14,
                            color: isActive
                              ? theme.palette.primary.main
                              : theme.palette.grey[400],
                          }}
                          primary={item.value}
                        />
                      </Box>
                    )}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
