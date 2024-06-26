import FormInput from '@/components/FormInput';
import Table from '@/components/Table';
import { useDeleteTagsMutation } from '@/features/api/tag/deleteTag';
import { useGetTagTypesQuery } from '@/features/api/tag/getTagTypes';
import { useGetTagsQuery } from '@/features/api/tag/getTags';
import { usePostTagMutation } from '@/features/api/tag/postTag';
import { UserRole } from '@/types/enums/UserRole';
import { ITag } from '@/types/interfaces/ITag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Chip, TextField, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NIL } from 'uuid';
import { TypeOf, z } from 'zod';

const tagSchema = z.object({
  Id: z.string().optional(),
  Name: z.string().min(1, '請輸入名稱').max(20, '名稱過長'),
  Type: z
    .object({
      Id: z.number(),
      Name: z.string(),
      Value: z.string(),
      Color: z.string(),
    })
    .required(),
});

type TagInput = TypeOf<typeof tagSchema>;

function TagForm() {
  const theme = useTheme();
  const [deleteTag] = useDeleteTagsMutation();
  const [postTag] = usePostTagMutation();
  const { data: tagsData } = useGetTagsQuery(undefined);
  const { data: tagTypesData } = useGetTagTypesQuery();

  const methods = useForm<TagInput>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      Id: NIL,
    },
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

  const onSubmitHandler: SubmitHandler<TagInput> = (values) => {
    postTag({
      Id: values.Id || NIL,
      Name: values.Name,
      TagTypeId: values.Type.Id,
    });
  };

  const handleEditClick = (row: ITag) => {
    setValue('Id', row.Id);
    setValue('Name', row.Name);
    setValue('Type', row.Type);
  };

  const handleDeleteClick = (ids: readonly string[]) => {
    deleteTag(ids as string[]);
  };

  return (
    <FormProvider {...methods}>
      <Box noValidate component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Table<ITag, keyof TagInput>
          title="標籤"
          data={tagsData?.result || []}
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
              id: 'Type',
              label: '類型',
              getCellLabel: (row) => (
                <Chip
                  label={row.Type.Name}
                  sx={{
                    backgroundColor: row.Type.Color,
                    color: theme.palette.getContrastText(row.Type.Color),
                  }}
                />
              ),
              formInput: (
                <Controller
                  name="Type"
                  render={({ field: { onChange, ...props } }) => (
                    <Autocomplete
                      {...props}
                      options={tagTypesData?.result || []}
                      getOptionLabel={(d) => `${d.Name} ( ${d.Value} )`}
                      renderInput={(params) => <TextField {...params} variant="standard" />}
                      onChange={(e, data) => onChange(data)}
                      value={null}
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

export default TagForm;
