import FormInput from '@/components/FormInput';
import Table from '@/components/Table';
import { useDeleteTagTypesMutation } from '@/features/api/tag/deleteTagTypes';
import { useGetTagTypesQuery } from '@/features/api/tag/getTagTypes';
import { usePostTagTypeMutation } from '@/features/api/tag/postTagType';
import { ITagType } from '@/types/interfaces/ITag';
import { zodResolver } from '@hookform/resolvers/zod';
import ColorizeIcon from '@mui/icons-material/Colorize';
import { Box, IconButton, InputAdornment, Menu, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf, z } from 'zod';

const tagTypeSchema = z.object({
  Id: z.number(),
  Name: z.string().min(1, '請輸入名稱').max(20, '名稱過長'),
  Value: z.string().min(1, '請輸入數值').max(20, '數值過長'),
  Color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, '請輸入正確的顏色格式(HEX)'),
});

type TagTypeInput = TypeOf<typeof tagTypeSchema>;

function TagTypeForm() {
  const { data: tagTypesData } = useGetTagTypesQuery();
  const [deleteTagTypes] = useDeleteTagTypesMutation();
  const [postTagType] = usePostTagTypeMutation();

  const methods = useForm<TagTypeInput>({
    resolver: zodResolver(tagTypeSchema),
    defaultValues: {
      Id: 0,
    },
  });

  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
  } = methods;

  const watchColor = watch('Color', '#000000');
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
    // TODO: validate unique value

    console.log('subit');
    postTagType(values);
  };

  const handleEditClick = (row: ITagType) => {
    Object.entries(row).forEach(([key, value]) => {
      setValue(key as keyof ITagType, value);
    });
  };

  const handleDeleteClick = (ids: readonly string[]) => {
    deleteTagTypes(ids as string[]);
  };

  return (
    <FormProvider {...methods}>
      <Box noValidate component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Table<ITagType, keyof TagTypeInput>
          title="標籤類型"
          data={tagTypesData?.result || []}
          defaultOrderBy="Name"
          editable
          onEditClick={handleEditClick}
          onSubmit={onSubmitHandler}
          onDelete={handleDeleteClick}
          cells={[
            {
              id: 'Id',
              label: 'Id',
              getCellLabel: (row) => row.Id,
              sx: { display: 'none' },
              formInput: <FormInput name={'Id'} label={'Id'} variant="standard" type="number" disabled hidden />,
            },
            {
              id: 'Name',
              label: '名稱',
              getCellLabel: (row) => row.Name,
              formInput: <FormInput name={'Name'} variant="standard" />,
            },
            {
              id: 'Value',
              label: '數值',
              getCellLabel: (row) => row.Value,
              formInput: <FormInput name={'Value'} variant="standard" />,
            },
            {
              id: 'Color',
              label: '顏色',
              getCellLabel: (row) => (
                <Box
                  sx={{
                    position: 'relative',
                    paddingLeft: '1.5em',
                    '::before': {
                      content: '""',
                      position: 'absolute',
                      top: '0.5em',
                      left: 0,
                      width: '1em',
                      height: '1em',
                      backgroundColor: row.Color,
                    },
                  }}
                >
                  <Typography>{row.Color}</Typography>
                </Box>
              ),
              formInput: (
                <FormInput
                  required
                  variant="standard"
                  name="Color"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton size="small" onClick={handleColorPickClick} sx={{ color: watchColor }}>
                          <ColorizeIcon fontSize="inherit" />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                          <ChromePicker
                            color={watchColor}
                            onChange={(color) => setValue('Color', color.hex)}
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
  );
}

export default TagTypeForm;
