import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormInputProps = {
  name: string;
  label: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message?.toString() : ""}
          {...otherProps}
        />
      )}
    />
  );
};

export default FormInput;
