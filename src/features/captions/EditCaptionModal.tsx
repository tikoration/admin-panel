import { Button, Typography } from "@mui/material";
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
      <Typography>This is a caption modal {captionToEdit?._id}</Typography>
      <FormComponent methods={methods} onSubmit={handleSubmit}>
        <ControlledTextInput id="national" name="national" label="National" />
        <ControlledTextInput id="foreign" name="foreign" label="Foreign" />
        <Button disabled={isPending} type="submit">
          Save
        </Button>
      </FormComponent>
    </Dialog>
  );
};

export default EditCaptionModal;
