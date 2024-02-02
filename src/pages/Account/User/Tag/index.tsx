import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import FormInput from "components/FormInput";
import Table from "components/Table";
import { useGetTagTypesQuery } from "features/api/tag/getTagTypes";
import { usePostTagTypeMutation } from "features/api/tag/postTagType";
import React, { useEffect } from "react";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TagTypeDTO } from "types/TagDTO";
import { HeadCellType } from "components/Table/utils";
import { ChromePicker } from "react-color";
import { TypeOf, object, z } from "zod";
import { Form } from "react-router-dom";
import { NIL } from "uuid";
import { useDeleteTagTypesMutation } from "features/api/tag/deleteTagTypes";

const tagTypeSchema = z.object({
  Id: z.string().optional(),
  Name: z.string().min(1, "請輸入名稱").max(20, "名稱過長"),
  Value: z.string().min(1, "請輸入數值").max(20, "數值過長"),
  Color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "請輸入正確的顏色格式(HEX)"),
});

type TagTypeInput = TypeOf<typeof tagTypeSchema>;

function Tag() {
  const { data: tagTypesData } = useGetTagTypesQuery();
  const [deleteTagTypes] = useDeleteTagTypesMutation();
  const [postTagType] = usePostTagTypeMutation();

  const methods = useForm<TagTypeInput>({
    resolver: zodResolver(tagTypeSchema),
    defaultValues: {
      Id: NIL,
    },
  });
  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
  } = methods;
  const watchColor = watch("Color", "#000000");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleColorPickClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<TagTypeInput> = (values) => {
    postTagType(values);
  };

  const handleEditClick = (row: TagTypeDTO) => {
    Object.entries(row).forEach(([key, value]) => {
      setValue(key as keyof TagTypeDTO, value);
    });
  };

  const handleDeleteClick = (ids: readonly string[]) => {
    deleteTagTypes(ids as string[]);
  };

  return (
    <Stack spacing={1}>
      <FormProvider {...methods}>
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Table<TagTypeDTO, keyof TagTypeInput>
            title="標籤類型"
            data={tagTypesData?.Data || []}
            property="Name"
            editable
            onEditClick={handleEditClick}
            onSubmit={onSubmitHandler}
            onDelete={handleDeleteClick}
            headCells={[
              {
                id: "Id",
                label: "Id",
                type: HeadCellType.Text,
                hidden: true,
                formInput: (
                  <FormInput
                    name={"Id"}
                    label={"Id"}
                    variant="standard"
                    disabled
                    hidden
                  />
                ),
              },
              {
                id: "Name",
                label: "名稱",
                type: HeadCellType.Text,
                disablePadding: true,
                formInput: <FormInput name={"Name"} variant="standard" />,
              },
              {
                id: "Value",
                label: "數值",
                type: HeadCellType.Text,
                formInput: <FormInput name={"Value"} variant="standard" />,
              },
              {
                id: "Color",
                label: "顏色",
                type: HeadCellType.Color,
                formInput: (
                  <FormInput
                    required
                    variant="standard"
                    name="Color"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            size="small"
                            onClick={handleColorPickClick}
                            sx={{ color: watchColor }}
                          >
                            <ColorizeIcon fontSize="inherit" />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <ChromePicker
                              color={watchColor}
                              onChange={(color) => setValue("Color", color.hex)}
                            ></ChromePicker>
                          </Menu>
                        </InputAdornment>
                      ),
                    }}
                  />
                ),
              },
            ]}
          />
        </Box>
      </FormProvider>

      <Typography variant="h5">標籤管理</Typography>
    </Stack>
  );
}

export default Tag;
