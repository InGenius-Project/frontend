import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Select, useTheme } from "@mui/material";
import FormInput from "components/FormInput";
import Table from "components/Table";
import { useDeletAreaTypesMutation } from "features/api/area/deleteAreaTypes";
import { useGetAreaTypesQuery } from "features/api/area/getAreaTypes";
import { usePostAreaTypeMutation } from "features/api/area/postAreaType";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { AreaTypeDTO, LayoutTypeDTO } from "types/DTO/AreaDTO";
import { TypeOf, z } from "zod";

const areaTypeSchema = z.object({
  Id: z.number(),
  Name: z.string().min(1, "請輸入名稱").max(20, "名稱過長"),
  Value: z.string(),
  Description: z.string(),
  LayoutType: z.string(),
  UserRole: z.string(),
});

type AreaTypeInput = TypeOf<typeof areaTypeSchema>;

function AreaTypeForm() {
  const theme = useTheme();
  const { data: areaTypesData } = useGetAreaTypesQuery();
  const [deleteAreaType] = useDeletAreaTypesMutation();
  const [postAreaType] = usePostAreaTypeMutation();

  const methods = useForm<AreaTypeInput>({
    resolver: zodResolver(areaTypeSchema),
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
    control,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<AreaTypeInput> = (values) => {
    // postAreaType({
    //   Id: values.Id,
    //   Name: values.Name,
    //   Type: {
    //     Id: values.Type.Id,
    //     Name: values.Type.Name,
    //     Value: values.Type.Value,
    //     Color: values.Type.Color,
    //   },
    // });
  };

  const handleEditClick = (row: AreaTypeDTO) => {
    setValue("Id", row.Id);
    setValue("Name", row.Name);
    setValue("Value", row.Value);
    setValue("Description", row.Description);
    setValue("LayoutType", row.LayoutType.toString());
    setValue("UserRole", row.UserRole.toString());
  };

  const handleDeleteClick = (ids: readonly string[]) => {
    deleteAreaType(ids as string[]);
  };

  return (
    <FormProvider {...methods}>
      <Box noValidate component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Table<AreaTypeDTO, keyof AreaTypeInput>
          title="區域類型"
          data={areaTypesData?.result || []}
          defaultOrderBy="Name"
          editable
          onEditClick={handleEditClick}
          // onSubmit={onSubmitHandler}
          onDelete={handleDeleteClick}
          cells={[
            {
              id: "Id",
              label: "Id",
              hidden: true,
              getCellLabel: (row) => row.Id,
              sx: { display: "none" },
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
              getCellLabel: (row) => row.Name,
              formInput: <FormInput name={"Name"} variant="standard" />,
            },
            {
              id: "Value",
              label: "值",
              getCellLabel: (row) => row.Value,
              formInput: <FormInput name={"Value"} variant="standard" />,
            },
            {
              id: "Description",
              label: "描述",
              getCellLabel: (row) => row.Description,
              formInput: <FormInput name={"Description"} variant="standard" />,
            },
            {
              id: "LayoutType",
              label: "版型",
              getCellLabel: (row) => row.LayoutType,
              formInput: (
                <FormInput
                  name={"LayoutType"}
                  variant="standard"
                  select
                  defaultValue={LayoutTypeDTO[0]}
                />
                // <Select name="LayoutType">
                //   {Object.keys(LayoutTypeDTO).toString()}
                // </Select>
              ),
            },
            {
              id: "UserRole",
              label: "使用者角色",
              getCellLabel: (row) => row.UserRole,
              formInput: <FormInput name={"UserRole"} variant="standard" />,
            },
          ]}
        />
      </Box>
    </FormProvider>
  );
}

export default AreaTypeForm;
