import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { ReactComponent as ImageTextFrame } from "assets/images/svg/image-text-frame.svg";
import { ReactComponent as KeyValueListFrame } from "assets/images/svg/key-value-list-frame.svg";
import { ReactComponent as ListFrame } from "assets/images/svg/list-frame.svg";
import { ReactComponent as TextFrame } from "assets/images/svg/text-frame.svg";
import { setLayoutType } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutTypeDTO } from "types/DTO/AreaDTO";

const LayoutButton = styled(ToggleButton)(({ theme }) => ({
  width: 200,
  height: 150,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: 10,
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const LayoutButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
    "&.Mui-selected": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.common.white,
    },
  },
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export default function Layout() {
  const layoutState = useAppSelector((state) => state.layoutState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedLayout: LayoutTypeDTO | null
  ) => {
    dispatch(setLayoutType(newSelectedLayout || LayoutTypeDTO.Text));
  };

  const handleNext = () => {
    navigate("../Area");
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h3">區塊排列方式</Typography>
      <Typography variant="caption">
        選擇區塊內的排版，依據您的需求選擇是否要放入圖片，或者用條列式的方式呈現
      </Typography>
      <LayoutButtonGroup
        exclusive
        value={layoutState.layoutType}
        onChange={handleChange}
      >
        <LayoutButton value={LayoutTypeDTO.Text}>
          <TextFrame />
          <Typography variant="body1">純文字</Typography>
        </LayoutButton>
        {/* <LayoutButton value={LayoutTypeDTO.ICONTEXT}>
          <IconTextFrame />
          <Typography variant="body1">貼圖與文字</Typography>
        </LayoutButton> */}
        <LayoutButton value={LayoutTypeDTO.ImageText}>
          <ImageTextFrame />
          <Typography variant="body1">文字與圖片</Typography>
        </LayoutButton>
        <LayoutButton value={LayoutTypeDTO.List}>
          <ListFrame />
          <Typography variant="body1">條列文字</Typography>
        </LayoutButton>
        <LayoutButton value={LayoutTypeDTO.KeyValueList}>
          <KeyValueListFrame />
          <Typography variant="body1">鍵值條列文字</Typography>
        </LayoutButton>
      </LayoutButtonGroup>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => navigate("../New")}>
          上一步
        </Button>
        <Button onClick={handleNext}>下一步</Button>
      </Stack>
    </Stack>
  );
}
