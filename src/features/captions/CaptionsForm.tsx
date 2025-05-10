import { Box, Button } from "@mui/material";
import FormComponent from "../../components/FormComponent";
import { captionsSchema, type CaptionsSchema } from "./captionsSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "../../components/ControlledTextInput";
import useAddWord from "./useAddWord";
import queryClient from "../../query/queryClient";

const CaptionsForm = () => {
  const methods = useForm<CaptionsSchema>({
    resolver: yupResolver(captionsSchema),
  });
  const { mutate: addCaption, isPending } = useAddWord();

  const handleSubmit = (data: CaptionsSchema) => {
    addCaption(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getAllWords"],
        });
        methods.reset();
      },
    });
  };

  return (
    <FormComponent methods={methods} onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <ControlledTextInput id="national" name="national" label="National" />
        <ControlledTextInput id="foreign" name="foreign" label="Foreign" />
        <Button disabled={isPending} type="submit" variant="contained">
          Add Word
        </Button>
      </Box>
    </FormComponent>
  );
};
export default CaptionsForm;
