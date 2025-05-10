import { Box } from "@mui/material";
import CountriesTable from "./CountriesTable";
import CountriesFilter from "./CountriesFilter";

const Countries = () => {
  return (
    <Box>
      <CountriesFilter />
      <CountriesTable />
    </Box>
  );
};

export default Countries;
