import { Box } from "@mui/material";
import DataTable from "../../components/DataTable";
import { useCallback, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useGetAllWords, { type IWordsContent } from "./useGetAllWords";
import useDeleteWord from "./useDeleteWord";
import EditCaptionModal from "./EditCaptionModal";

const CaptionsTable = () => {
  const { data, refetch, isPending } = useGetAllWords();
  const { mutate: deleteWord } = useDeleteWord();
  const [captionToEdit, setCaptionToEdit] = useState<IWordsContent | null>(
    null
  );

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
              <DeleteOutlineIcon
                style={{ width: "40px", height: "40px" }}
                onClick={() => handleDelete(captionId)}
              />
              <EditIcon
                onClick={() => {
                  setCaptionToEdit(info.row.original);
                }}
              />
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
        data={data?.words || []}
        columns={columns}
        pending={isPending}
      />
      <EditCaptionModal
        handleClose={() => setCaptionToEdit(null)}
        captionToEdit={captionToEdit}
      />
    </Box>
  );
};

export default CaptionsTable;
