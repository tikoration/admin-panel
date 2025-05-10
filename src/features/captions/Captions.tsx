import { Box, Divider } from "@mui/material";
import CaptionsForm from "./CaptionsForm";
import CaptionsTable from "./CaptionsTable";

const Captions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 4,
      }}
    >
      <CaptionsForm />
      <Divider />
      <CaptionsTable />
    </Box>
  );
};

export default Captions;
