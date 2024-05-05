import ImageTextFrame from '@/assets/images/svg/image-text-frame.svg?react';
import KeyValueListFrame from '@/assets/images/svg/key-value-list-frame.svg?react';
import ListFrame from '@/assets/images/svg/list-frame.svg?react';
import TextFrame from '@/assets/images/svg/text-frame.svg?react';
import { setLayoutType } from '@/features/layout/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { Stack, ToggleButton, ToggleButtonGroup, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const LayoutButton = styled(ToggleButton)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return {
    width: isMobile ? 'fit-content' : 200,
    height: isMobile ? 80 : 150,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    gap: theme.spacing(2),
    borderRadius: 10,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  };
});

const LayoutButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&.Mui-selected': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.common.white,
    },
  },
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

export default function AreaLayoutItem() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const layoutState = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newSelectedLayout: LayoutType | null) => {
    dispatch(setLayoutType(newSelectedLayout || LayoutType.Text));
  };

  return (
    <Stack spacing={1}>
      {isMobile && (
        <>
          <Typography variant="h5">新增自定義區塊版面</Typography>
          <Typography variant="caption">請選擇下方提供的版面</Typography>
        </>
      )}
      <LayoutButtonGroup exclusive value={layoutState.layoutType} onChange={handleChange}>
        <LayoutButton value={LayoutType.Text}>
          <TextFrame />
          <Typography variant="body1">純文字</Typography>
        </LayoutButton>
        {/* <LayoutButton value={LayoutTypeDTO.ICONTEXT}>
          <IconTextFrame />
          <Typography variant="body1">貼圖與文字</Typography>
        </LayoutButton> */}
        <LayoutButton value={LayoutType.ImageText}>
          <ImageTextFrame />
          <Typography variant="body1">文字與圖片</Typography>
        </LayoutButton>
        <LayoutButton value={LayoutType.List}>
          <ListFrame />
          <Typography variant="body1">條列文字</Typography>
        </LayoutButton>
        <LayoutButton value={LayoutType.KeyValueList}>
          <KeyValueListFrame />
          <Typography variant="body1">鍵值條列文字</Typography>
        </LayoutButton>
      </LayoutButtonGroup>
    </Stack>
  );
}
