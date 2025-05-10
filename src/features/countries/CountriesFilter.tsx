import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

const CountriesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const independent = searchParams.get("independent");
  const currency = searchParams.get("currency");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "end",
        gap: 3,
        mb: 2,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={independent === "on"}
            onChange={(e) => {
              setSearchParams((params) => {
                if (e.target.checked) {
                  params.set("independent", "on");
                } else {
                  params.delete("independent");
                }
                params.set("page", "1");
                return params;
              });
            }}
          />
        }
        label="Independent"
      />
      <FormControl sx={{ maxWidth: 200 }}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          value={currency || ""}
          onChange={(e) => {
            setSearchParams((params) => {
              const value = e.target.value;
              if (value === "") {
                params.delete("currency");
              } else {
                params.set("currency", value);
                params.set("page", "1");
              }
              return params;
            });
          }}
          label="Currency"
        >
          <MenuItem value="">All Currencies</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountriesFilter;
