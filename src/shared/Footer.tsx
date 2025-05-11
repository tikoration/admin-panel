import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      height={75}
      display={"flex"}
      justifyContent={"space-between"}
      borderTop={`1px solid #EEEEEE`}
      alignItems={"center"}
      sx={{
        padding: {
          xs: "16px 44px",
          md: "24px 64px",
        },
        paddingLeft: {
          md: "299px",
        },
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Box display={"flex"} alignItems={"center"} gap={0.5}>
          <Typography fontSize={14}> &copy; </Typography>
        </Box>
        <Typography color={theme.palette.grey[900]} fontSize={14}>
          {new Date().getFullYear()} Admin Panel
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
