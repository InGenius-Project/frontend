import React from "react";
import { Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SideBarToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(1),
    border: 0,
  },
}));

const SideBarButton = styled(ToggleButton)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  justifyContent: "flex-start",
  alignItems: "center",
}));

const SideBarButtonIcon = styled("span")(({ theme }) => ({
  display: "flex",
  marginRight: theme.spacing(1),
  alignItems: "center",
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState("profile");

  const handleNavigate = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string
  ) => {
    setCurrentTab(newTab);
    navigate(newTab ? `/Account/User/${newTab}` : "/Account/User");
  };

  return (
    <Stack spacing={1}>
      <SideBarToggleButtonGroup
        color="primary"
        orientation="vertical"
        exclusive
        value={currentTab}
        onChange={handleNavigate}
      >
        <SideBarButton value="Profile">
          <SideBarButtonIcon>
            <HomeOutlinedIcon />
          </SideBarButtonIcon>
          個人首頁
        </SideBarButton>
        <SideBarButton value="Resume">
          <SideBarButtonIcon>
            <InsertDriveFileOutlinedIcon />
          </SideBarButtonIcon>
          履歷
        </SideBarButton>
        <SideBarButton value="Intern">
          <SideBarButtonIcon>
            <WorkOutlineOutlinedIcon />
          </SideBarButtonIcon>
          實習管理
        </SideBarButton>
      </SideBarToggleButtonGroup>
    </Stack>
  );
}
