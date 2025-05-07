import { useSearchParams } from "react-router-dom";
import { default as MuiPagination } from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

type PaginatorProps = {
  totalPages: number;
  paramName?: string;
};

const Pagination: React.FC<PaginatorProps> = ({
  totalPages = 1,
  paramName = "page",
}) => {
  const [params, setSearchParams] = useSearchParams();
  const page = parseInt(params.get(paramName) || "1", 10);

  return (
    <MuiPagination
      sx={{
        "& .MuiPagination-ul": {
          justifyContent: "center",
          "li:last-child:has(.MuiPaginationItem-previousNext)": {
            marginLeft: "auto",
          },

          "& .MuiPaginationItem-root": {},
        },
      }}
      page={page}
      count={totalPages}
      showFirstButton={true}
      showLastButton={true}
      boundaryCount={1}
      siblingCount={1}
      shape={"rounded"}
      renderItem={(item) => (
        <PaginationItem
          components={{
            previous: ArrowBackIosNewRoundedIcon,
            next: ArrowForwardIosRoundedIcon,
          }}
          sx={{
            borderRadius: "100%",
          }}
          {...item}
          onClick={() => {
            if (page === item.page) return;
            setSearchParams((params) => {
              params.set(paramName, String(item.page));
              return params;
            });
          }}
        />
      )}
    />
  );
};

export default Pagination;
