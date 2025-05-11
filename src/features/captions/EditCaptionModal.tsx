import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import type { IWordsContent } from "./useGetAllWords";
import FormComponent from "../../components/FormComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { captionsSchema, type CaptionsSchema } from "./captionsSchema";
import useUpdateWord from "./useUpdateWord";
import ControlledTextInput from "../../components/ControlledTextInput";
import { useEffect } from "react";
import queryClient from "../../query/queryClient";

const EditCaptionModal = ({
  handleClose,
  captionToEdit,
}: {
  handleClose: () => void;
  captionToEdit: IWordsContent | null;
}) => {
  const methods = useForm({
    resolver: yupResolver(captionsSchema),
  });
  const { mutate: editWord, isPending } = useUpdateWord();
  const handleSubmit = (data: CaptionsSchema) => {
    if (captionToEdit) {
      editWord(
        { id: captionToEdit?._id, data },
        {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({
              queryKey: ["getAllWords"],
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    methods.reset({
      national: captionToEdit?.national,
      foreign: captionToEdit?.foreign,
    });
  }, [captionToEdit, methods]);

  return (
    <Dialog open={!!captionToEdit} onClose={handleClose}>
      <FormComponent methods={methods} onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
            minWidth: { xs: "260px", sm: "300px" },
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 700, mb: "5px" }}>
            Edit Caption
          </Typography>

          <ControlledTextInput id="national" name="national" label="National" />
          <ControlledTextInput id="foreign" name="foreign" label="Foreign" />
          <Button disabled={isPending} type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </FormComponent>
    </Dialog>
  );
};

export default EditCaptionModal;
