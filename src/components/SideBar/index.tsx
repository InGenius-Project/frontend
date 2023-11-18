import React from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { motion } from "framer-motion";

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
  whiteSpace: "nowrap",
}));

const SideBarLeftIcon = styled("span")(({ theme }) => ({
  display: "flex",
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
  alignItems: "center",
}));

const SideBar = () => {
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
    <motion.aside
      style={{ flexShrink: 0 }}
      initial={{ x: -100, width: 0, opacity: 0 }}
      animate={{ x: 0, width: "var(--ing-width-sidebar)", opacity: 1 }}
      exit={{
        x: -100,
        width: 0,
        opacity: 0,
      }}
      transition={{
        type: "linear",
      }}
    >
      <SideBarToggleButtonGroup
        color="primary"
        orientation="vertical"
        exclusive
        value={currentTab}
        onChange={handleNavigate}
        sx={{ width: "100%", position: "sticky", top: 0 }}
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
    </motion.aside>
  );
};

export default SideBar;
