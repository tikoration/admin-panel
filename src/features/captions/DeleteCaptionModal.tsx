import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import useDeleteWord from "./useDeleteWord";
import queryClient from "../../query/queryClient";

const DeleteCaptionModal = ({
  handleClose,
  captionToDelete,
}: {
  handleClose: () => void;
  captionToDelete: string | null;
}) => {
  const { mutate: deleteWord, isPending } = useDeleteWord();

  const handleDelete = () => {
    if (captionToDelete) {
      deleteWord(captionToDelete, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getAllWords"],
          });
          handleClose();
        },
      });
    }
  };

  return (
    <Dialog open={!!captionToDelete} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "30px",
          maxWidth: { xs: "250px", sm: "350px" },
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700, mb: "5px" }}>
          Are you sure want to delete this caption?
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
          <Button disabled={isPending} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="contained"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteCaptionModal;
