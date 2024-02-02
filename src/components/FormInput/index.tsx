import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label?: string;
  inlined?: boolean;
} & TextFieldProps;

export default function FormInput({
  name,
  label = "",
  ...otherProps
}: FormInputProps) {
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
}
