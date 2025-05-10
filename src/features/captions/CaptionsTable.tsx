import { Box, IconButton } from "@mui/material";
import DataTable from "../../components/DataTable";
import { useCallback, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useGetAllWords, { type IWordsContent } from "./useGetAllWords";
import useDeleteWord from "./useDeleteWord";
import EditCaptionModal from "./EditCaptionModal";
import { useSearchParams } from "react-router-dom";

const CaptionsTable = () => {
  const { data, refetch, isPending } = useGetAllWords();
  const { mutate: deleteWord } = useDeleteWord();
  const [captionToEdit, setCaptionToEdit] = useState<IWordsContent | null>(
    null
  );
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "15", 10);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data?.words.slice(start, end);
  }, [data, page, perPage]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteWord(id, {
        onSuccess: () => {
          refetch();
        },
      });
    },
    [deleteWord, refetch]
  );

  const columns = useMemo<ColumnDef<IWordsContent>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        meta: {
          style: {
            width: "125px",
          },
        },
      },
      { accessorKey: "national", header: "National" },
      {
        accessorKey: "foreign",
        header: "Foreign",
      },

      {
        header: "Actions",
        meta: {
          style: {
            width: "100px",
          },
        },
        cell: (info) => {
          const captionId = info.row.original._id;

          return (
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                gap: 1,
              }}
              paddingY={"5px"}
            >
              <IconButton onClick={() => setCaptionToEdit(info.row.original)}>
                <EditIcon color="action" />
              </IconButton>
              <IconButton onClick={() => handleDelete(captionId)}>
                <DeleteOutlineIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [handleDelete]
  );

  return (
    <Box>
      <DataTable
        data={paginatedData || []}
        columns={columns}
        pending={isPending}
        totalElements={data?.words?.length}
      />
      <EditCaptionModal
        handleClose={() => setCaptionToEdit(null)}
        captionToEdit={captionToEdit}
      />
    </Box>
  );
};

export default CaptionsTable;
