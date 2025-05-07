import { Box, Typography } from "@mui/material";
import CaptionsForm from "./CaptionsForm";
import CaptionsTable from "./CaptionsTable";

const Captions = () => {
  return (
    <Box>
      <Typography>Captions Page</Typography>
      <CaptionsForm />
      <CaptionsTable />
    </Box>
  );
};

export default Captions;
