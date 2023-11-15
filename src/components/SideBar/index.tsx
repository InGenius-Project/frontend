import React from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { Box, Checkbox } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const SideBarToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(1),
    border: 0,
  },
}));

const SideBarButton = styled(ToggleButton)(({ theme }) => ({
  position: "relative",
  px: theme.spacing(2),
  justifyContent: "flex-start",
  alignItems: "center",
}));

const SideBarLeftIcon = styled("span")(({ theme }) => ({
  display: "flex",
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
  alignItems: "center",
}));

type SideBarProps = {
  toggle: boolean;
  onToggle: (
    event: React.ChangeEvent<HTMLInputElement>,
    newState: boolean
  ) => void;
};

const SideBar = ({ toggle, onToggle }: SideBarProps) => {
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
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "var(--lng-width-sidebar)",
          flexShrink: 0,
          display: toggle ? "box" : "none",
        }}
      >
        <SideBarToggleButtonGroup
          color="primary"
          orientation="vertical"
          exclusive
          value={currentTab}
          onChange={handleNavigate}
          sx={{ width: "100%" }}
        >
          <SideBarButton value="Profile">
            <SideBarLeftIcon>
              <img
                src={dummyUserImage}
                alt="userImage"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            </SideBarLeftIcon>
            王曉明
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Checkbox
                checked={toggle}
                icon={<KeyboardDoubleArrowRightIcon />}
                checkedIcon={<KeyboardDoubleArrowLeftIcon />}
                onChange={onToggle}
              />
            </Box>
          </SideBarButton>
          <SideBarButton value="Resume">
            <SideBarLeftIcon>
              <InsertDriveFileOutlinedIcon />
            </SideBarLeftIcon>
            履歷
          </SideBarButton>
          <SideBarButton value="Intern">
            <SideBarLeftIcon>
              <WorkOutlineOutlinedIcon />
            </SideBarLeftIcon>
            實習管理
          </SideBarButton>
        </SideBarToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default SideBar;
