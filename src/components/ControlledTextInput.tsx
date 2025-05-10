import { Box, FormHelperText, TextField } from "@mui/material";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IcontrolledTextInput {
  name: string;
  label: string;
  id: string | undefined;
  type?: string;
  disabled?: boolean;
}

const ControlledTextInput: FC<IcontrolledTextInput> = ({
  name,
  label,
  id,
  type,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Box>
            <TextField
              value={value ?? ""}
              id={id}
              label={label}
              onChange={onChange}
              type={type}
              error={!!error}
              disabled={disabled}
            />
            {error && (
              <FormHelperText
                error={!!error}
                sx={{
                  marginTop: "4px",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {error.message || ""}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
};

export default ControlledTextInput;
