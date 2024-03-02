import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import FormInput from "components/FormInput";
import { useGetAreaTypeByIdQuery } from "features/api/area/getAreaTypeById";
import { usePostAreaTypeMutation } from "features/api/area/postAreaType";
import { useGetTagTypesQuery } from "features/api/tag/getTagTypes";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LayoutTypeObject } from "types/enums/LayoutType";
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
  ListTagTypes: z.array(
    z.object({
      Id: z.number(),
      Name: z.string(),
      Color: z.string(),
      Value: z.string(),
    })
  ),
});

type AreaListTypeInput = TypeOf<typeof areaListTypeSchema>;

function ManageAreaList() {
  const { areaTypeId } = useParams<{ areaTypeId: string }>();
  const { data: tagTypesData } = useGetTagTypesQuery();
  const { data: areaTypeData } = useGetAreaTypeByIdQuery(
    parseInt(areaTypeId || "0")
  );
  const [postAreaType] = usePostAreaTypeMutation();
  const { data: allTagTypes } = useGetTagTypesQuery();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm<AreaListTypeInput>({
    resolver: zodResolver(areaListTypeSchema),
  });
  const {
    reset,
    formState: { isSubmitSuccessful },
    handleSubmit,
    control,
  } = methods;

  const onSubmitHandler: SubmitHandler<AreaListTypeInput> = ({ ...data }) => {
    postAreaType({
      Id: data.Id,
      Name: data.Name,
      Value: data.Value,
      Description: data.Description,
      LayoutType: data.LayoutType.value,
      UserRole: data.UserRole.map((d) => d.value),
      ListTagTypeIds: data.ListTagTypes.map((d) => d.Id),
    })
      .unwrap()
      .then(() => {
        toast.success("修改成功");
        // navigate("..", { replace: true });
      });
  };

  useEffect(() => {
    if (areaTypeData && areaTypeData.result) {
      const defaultFormData = {
        Id: areaTypeData.result.Id,
        Name: areaTypeData.result.Name,
        Value: areaTypeData.result.Value,
        Description: areaTypeData.result.Description,
        UserRole: areaTypeData.result.UserRole.map((d) => ({
          value: d,
          label: UserRoleObject.find((o) => o.value === d)?.label || "",
        })),
        LayoutType: {
          value: areaTypeData.result.LayoutType,
          label:
            LayoutTypeObject.find(
              (d) => d.value === areaTypeData.result?.LayoutType
            )?.label || "",
        },
        ListTagTypes: areaTypeData.result.ListTagTypes,
      };
      reset(defaultFormData, { keepDirty: true });
    }
  }, [areaTypeData, areaTypeData?.result  , reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <FormProvider {...methods}>
      <Paper
        component={"form"}
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ p: 2 }}
      >
        <Stack spacing={2} width={"100%"}>
          <FormInput name="Id" sx={{ display: "none" }} />
          <FormInput name="Name" label="名稱" />
          <FormInput name="Value" label="值" />
          <FormInput name="Description" label="描述" />

          <Controller
            control={control}
            name="UserRole"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={UserRoleObject}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(d) => (d ? d.label : "")}
                renderInput={(params) => (
                  <TextField {...params} label="使用者" />
                )}
                onChange={(e, data) => onChange(data || [])}
                value={value || []}
              />
            )}
          />
          <Controller
            name="LayoutType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={LayoutTypeObject}
                getOptionLabel={(d) => (d ? d.label : "")}
                renderInput={(params) => <TextField {...params} label="版面" />}
                onChange={(e, data) => onChange(data || null)}
                value={value || null}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
              />
            )}
          />

          {allTagTypes && allTagTypes.result && (
            <Controller
              name="ListTagTypes"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={allTagTypes?.result || []}
                  getOptionLabel={(d) => (d ? `${d.Name} ( ${d.Value} )` : "")}
                  renderInput={(params) => (
                    <TextField {...params} label="可選標籤類型" />
                  )}
                  onChange={(e, data) => {
                    onChange(([data].flat(1) as ITagType[]) || []);
                  }}
                  value={value || []}
                  isOptionEqualToValue={(option, value) =>
                    option.Id === value.Id
                  }
                />
              )}
            />
          )}

          <Stack direction={"row"} spacing={1}>
            <Button type="submit">儲存</Button>
            <Button onClick={() => navigate("..", { replace: true })}>
              取消
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </FormProvider>
  );
}

export default ManageAreaList;
