import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import Pagination from "./TablePagination";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, useTheme } from "@mui/material";
import React, { type CSSProperties } from "react";

type CustomColumnMeta = {
  style?: CSSProperties;
  tooltip?: boolean;
};

type CustomColumnDef<TData> = ColumnDef<TData> & {
  meta?: CustomColumnMeta;
};
type CustomTableProps<TData> = {
  data: TData[];
  columns: CustomColumnDef<TData>[];
  totalElements?: number;
  pending: boolean;
};
const truncate = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const DataTable = <TData,>({
  data,
  columns,
  totalElements = 0,
  pending,
}: CustomTableProps<TData>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const perPage = parseInt(searchParams.get("perPage") || "15", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const table = useReactTable({
    columns: columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const totalPages = Math.ceil(totalElements / perPage);
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        boxShadow: "0px 2px 8.6px 0px #0000001A",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ background: "#F9FAFB" }}>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr
                  key={headerGroup.id}
                  style={{
                    height: "48px",
                    borderBottom: "1px solid #DBDCDC",
                  }}
                >
                  {headerGroup.headers.map((header, index) => {
                    const styles = (
                      header.column.columnDef.meta as CustomColumnMeta
                    )?.style;

                    const lastIndex = header.headerGroup.headers?.length - 1;
                    return (
                      <th
                        style={{
                          width: "auto",
                          textAlign: "start",
                          paddingLeft: "16px",
                          color: "#7f838a",
                          fontSize: "12px",
                          cursor: "pointer",
                          borderTopLeftRadius: index === 0 ? "12px" : "",
                          borderTopRightRadius:
                            index === lastIndex ? "12px" : "",
                          ...styles,
                        }}
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        <Box
                          sx={{
                            width: "inherit",
                          }}
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Box>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody
            style={{
              background: "#fff",
            }}
          >
            {pending ? (
              <tr>
                <td colSpan={100}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    height="70px"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                </td>
              </tr>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <tr
                      key={row.id}
                      style={{
                        height: "45px",
                        borderBottom: "1px solid #DBDCDC",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const styles = (
                          cell.column.columnDef.meta as CustomColumnMeta
                        )?.style;

                        return (
                          <td
                            key={cell.id}
                            style={{
                              paddingLeft: "16px",
                              fontSize: 14,
                              ...(styles?.width && {
                                ...truncate,
                                maxWidth: styles?.width,
                              }),
                              ...styles,
                            }}
                          >
                            <span onClick={(e) => e.stopPropagation()}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={100}>
                  <Typography
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize={12}
                    paddingTop={"20px"}
                    paddingBottom={"10px"}
                    color={theme.palette.grey[400]}
                  >
                    No Items
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Box />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          justifyContent: "center",
          background: "#fff",
          padding: { xs: "12px 8px", lg: "12px 16px" },
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <Pagination totalPages={totalPages} />
        <Box
          sx={{
            position: { lg: "absolute" },
            right: 22,
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "end",
            width: { xs: "100%", lg: "unset" },
            paddingRight: { xs: "10px", lg: "0px" },
          }}
        >
          <select
            value={perPage}
            onChange={(e) => {
              setSearchParams((params) => {
                params.set("perPage", e.target.value);
                return params;
              });
            }}
            style={{
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              outline: "none",
              color: theme.palette.grey[600],
            }}
          >
            {[10, 15, 20, 25, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <Typography fontSize={12} color={theme.palette.grey[600]}>
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, totalElements)}{" "}
            of {totalElements}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
