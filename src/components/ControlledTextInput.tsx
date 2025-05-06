import { TextField } from "@mui/material";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IcontrolledTextInput {
  name: string;
  label: string;
  id: string | undefined;
  type?: string;
}

const ControlledTextInput: FC<IcontrolledTextInput> = ({
  name,
  label,
  id,
  type,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <TextField
              value={value ?? ""}
              id={id}
              label={label}
              onChange={onChange}
              type={type}
            />
          </>
        );
      }}
    />
  );
};

export default ControlledTextInput;
