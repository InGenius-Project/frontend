import FormInput from '@/components/FormInput';
import Table from '@/components/Table';
import { useDeletAreaTypesMutation } from '@/features/api/area/deleteAreaTypes';
import { useGetAreaTypesQuery } from '@/features/api/area/getAreaTypes';
import { usePostAreaTypeMutation } from '@/features/api/area/postAreaType';
import { LayoutType, LayoutTypeObject } from '@/types/enums/LayoutType';
import { UserRole, UserRoleObject } from '@/types/enums/UserRole';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeOf, z } from 'zod';

const areaTypeSchema = z.object({
  Id: z.coerce.number(),
  Name: z.string().min(1, '請輸入名稱').max(20, '名稱過長'),
  Value: z.string(),
  Description: z.string({ required_error: '請輸入描述' }),
  LayoutType: z.object({ value: z.number(), label: z.string() }),
  UserRole: z.array(z.object({ value: z.number(), label: z.string() })),
});

type AreaTypeInput = TypeOf<typeof areaTypeSchema>;

function AreaTypeForm() {
  const navigate = useNavigate();

  const { data: areaTypesData } = useGetAreaTypesQuery({
    roles: Object.keys(UserRole).filter((v) => !isNaN(Number(v))) as unknown as UserRole[],
  });
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
    postAreaType({
      Id: values.Id,
      Name: values.Name,
      Value: values.Value,
      Description: values.Description,
      LayoutType: values.LayoutType.value,
      UserRole: values.UserRole.map((r) => r.value),
      ListTagTypes: [],
    });
  };

  const handleEditClick = (row: AreaTypeInput) => {
    if (row.LayoutType.value === LayoutType.List || row.LayoutType.value === LayoutType.KeyValueList) {
      navigate(`List/${row.Id}`);
      return;
    }

    setValue('Id', row.Id);
    setValue('Name', row.Name);
    setValue('Value', row.Value);
    setValue('Description', row.Description);
    setValue('LayoutType', row.LayoutType);
    setValue('UserRole', row.UserRole);
  };

  const handleDeleteClick = (ids: readonly string[]) => {
    deleteAreaType(ids as string[]);
  };

  return (
    <FormProvider {...methods}>
      <Box noValidate component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Table<AreaTypeInput, keyof AreaTypeInput>
          title="區域類型"
          data={
            areaTypesData?.result?.map((r: any) => ({
              ...r,
              LayoutType: LayoutTypeObject.find((l) => l.value === r.LayoutType) || { value: 0, label: '' },
              UserRole: r.UserRole.map((r: any) => ({
                value: r as number,
                label: UserRoleObject.find((u) => u.value === r)?.label || '',
              })),
            })) || []
          }
          defaultOrderBy="Name"
          editable
          onEditClick={handleEditClick}
          onSubmit={onSubmitHandler}
          onDelete={handleDeleteClick}
          cells={[
            {
              id: 'Id',
              label: 'Id',
              hidden: true,
              getCellLabel: (row) => row.Id,
              sx: { display: 'none' },
              formInput: <FormInput name={'Id'} label={'Id'} variant="standard" disabled hidden />,
            },
            {
              id: 'Name',
              label: '名稱',
              getCellLabel: (row) => row.Name,
              formInput: <FormInput name={'Name'} variant="standard" />,
            },
            {
              id: 'Value',
              label: '值',
              getCellLabel: (row) => row.Value,
              formInput: <FormInput name={'Value'} variant="standard" />,
            },
            {
              id: 'Description',
              label: '描述',
              getCellLabel: (row) => row.Description,
              formInput: <FormInput name={'Description'} variant="standard" />,
            },
            {
              id: 'LayoutType',
              label: '版型',
              getCellLabel: (row) => row.LayoutType.label,
              formInput: (
                <Controller
                  name="LayoutType"
                  render={({ field: { onChange, ...props } }) => (
                    <Autocomplete
                      {...props}
                      options={LayoutTypeObject}
                      getOptionLabel={(d) => d.label}
                      renderInput={(params) => <TextField {...params} variant="standard" />}
                      onChange={(e, data) => onChange(data)}
                      value={undefined}
                    />
                  )}
                  control={control}
                />
              ),
            },
            {
              id: 'UserRole',
              label: '使用者角色',
              getCellLabel: (row) =>
                row.UserRole.map((r) => UserRoleObject.find((u) => u.value === r.value)?.label).join(', '),
              formInput: (
                <Controller
                  name="UserRole"
                  render={({ field: { onChange, ...props } }) => (
                    <Autocomplete
                      {...props}
                      multiple
                      options={UserRoleObject}
                      getOptionLabel={(d) => d.label}
                      renderInput={(params) => <TextField {...params} variant="standard" />}
                      value={undefined}
                      onChange={(e, data) => onChange(data)}
                    />
                  )}
                  control={control}
                />
              ),
            },
          ]}
        />
      </Box>
    </FormProvider>
  );
}

export default AreaTypeForm;
