import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import FormInput from "components/FormInput";
import { useGetAreaTypeByIdQuery } from "features/api/area/getAreaTypeById";
import { usePostAreaTypeMutation } from "features/api/area/postAreaType";
import { useGetTagTypesQuery } from "features/api/tag/getTagTypes";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { LayoutType } from "types/enums/LayoutType";
import { UserRoleObject } from "types/enums/UserRole";
import { ITagType } from "types/interfaces/ITag";
import { TypeOf, z } from "zod";

const areaListTypeSchema = z.object({
  Id: z.coerce.number(),
  Name: z.string().min(1, "請輸入名稱").max(20, "名稱過長"),
  Value: z.string(),
  Description: z.string({ required_error: "請輸入描述" }),
  LayoutType: z.object({ value: z.number(), label: z.string() }),
  UserRole: z.array(z.object({ value: z.number(), label: z.string() })),
});

type AreaListTypeInput = TypeOf<typeof areaListTypeSchema>;

function ManageAreaList() {
  const { areaTypeId } = useParams<{ areaTypeId: string }>();
  const { data: tagTypesData } = useGetTagTypesQuery();
  const { data: areaTypeData } = useGetAreaTypeByIdQuery(
    parseInt(areaTypeId || "0")
  );
  const [postAreaType] = usePostAreaTypeMutation();
  const [selectTagTypes, setSelectTagTypes] = useState<ITagType[]>([]);

  const onSubmitHandler: SubmitHandler<AreaListTypeInput> = () => {
    if (areaTypeData && areaTypeData.result)
      postAreaType({
        ...areaTypeData.result,
        ListTagTypes: selectTagTypes,
      });
  };

  const methods = useForm<AreaListTypeInput>({
    resolver: zodResolver(areaListTypeSchema),
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

  return (
    <FormProvider {...methods}>
      <Stack component={"form"} spacing={1}>
        <FormInput
          name="Name"
          label="名稱"
          defaultValue={areaTypeData?.result?.Name}
        />
        <FormInput
          name="Value"
          label="值"
          defaultValue={areaTypeData?.result?.Value}
        />
        <FormInput
          name="Description"
          label="描述"
          defaultValue={areaTypeData?.result?.Description}
        />

        <Controller
          name="UserRole"
          render={({ field: { onChange, ...props } }) => (
            <Autocomplete
              {...props}
              multiple
              options={UserRoleObject}
              getOptionLabel={(d) => d.label}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
              value={undefined}
              onChange={(e, data) => onChange(data)}
            />
          )}
          control={control}
        />

        {areaTypeData?.result && (
          <>
            <TextField disabled value={areaTypeData.result.Name}></TextField>
            {areaTypeData.result.LayoutType === LayoutType.List ||
              (areaTypeData.result.LayoutType === LayoutType.KeyValueList && (
                <Autocomplete
                  multiple={
                    areaTypeData.result.LayoutType === LayoutType.KeyValueList
                  }
                  options={tagTypesData?.result || []}
                  getOptionLabel={(d) => `${d.Name} ( ${d.Value} )`}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                  value={selectTagTypes}
                  onChange={(e, data) => {
                    setSelectTagTypes([data].flat(1) as ITagType[]);
                  }}
                />
              ))}
          </>
        )}
        <Stack direction={"row"} spacing={1}>
          <Button type="submit">儲存</Button>
          <Button>取消</Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default ManageAreaList;
