import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { ReactComponent as TextFrame } from "assets/images/svg/text-frame.svg";
import { ReactComponent as IconTextFrame } from "assets/images/svg/icon-text-frame.svg";
import { ReactComponent as ImageTextFrame } from "assets/images/svg/image-text-frame.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "features/store";
import { LayoutArrangement } from "types/DTO/ResumeDTO";
import { setArrangement } from "features/area/areaSlice";

const LayoutButton = styled(ToggleButton)(({ theme }) => ({
  width: 200,
  height: 150,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: 10,
}));

const LayoutButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export default function Layout() {
  const [selectedLayout, setSelectLayout] =
    React.useState<LayoutArrangement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedLayout: LayoutArrangement | null
  ) => {
    setSelectLayout(newSelectedLayout);
  };

  const handleNext = () => {
    dispatch(setArrangement(selectedLayout || LayoutArrangement.TEXT));

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
        value={selectedLayout}
        onChange={handleChange}
      >
        <LayoutButton value={LayoutArrangement.TEXT}>
          <TextFrame />
          <Typography variant="body1">純文字</Typography>
        </LayoutButton>
        {/* <LayoutButton value="icon-text">
          <IconTextFrame />
          <Typography variant="body1">貼圖與文字</Typography>
        </LayoutButton> */}
        <LayoutButton value={LayoutArrangement.IMAGETEXT}>
          <ImageTextFrame />
          <Typography variant="body1">文字與圖片</Typography>
        </LayoutButton>
        {/* <LayoutButton value="list">
          <TextFrame />
          <Typography variant="body1">條列文字</Typography>
        </LayoutButton>
        <LayoutButton value="key-value-list">
          <TextFrame />
          <Typography variant="body1">鍵值條列文字</Typography>
        </LayoutButton> */}
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
