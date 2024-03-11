import React from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dummyUserImage from "@/assets/images/png/dummyUserImage.jpg";
import { motion } from "framer-motion";
import { useAppSelector } from "@/features/store";
import { UserRole } from "@/types/DTO/UserDTO";

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

export const navigationConfig = [
  {
    role: UserRole.Intern,
    items: [
      {
        name: "個人首頁",
        value: "Profile",
        icon: (
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
        ),
      },
      {
        name: "履歷管理",
        value: "Resume",
        icon: <InsertDriveFileOutlinedIcon />,
      },
      {
        name: "職缺管理",
        value: "Recruitment",
        icon: <WorkOutlineOutlinedIcon />,
      },
    ],
  },
  {
    role: UserRole.Company,
    items: [
      {
        name: "公司首頁",
        value: "Profile",
        icon: (
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
        ),
      },
      {
        name: "職缺管理",
        value: "Recruitment",
        icon: <WorkOutlineOutlinedIcon />,
      },
    ],
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.User);

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
        {navigationConfig.map((config) => {
          if (config.role === user?.Role) {
            return config.items.map((item) => (
              <SideBarButton
                key={item.name}
                value={item.value}
                sx={{ justifyContent: "flex-start" }}
              >
                <SideBarLeftIcon>{item.icon}</SideBarLeftIcon>
                {item.name}
              </SideBarButton>
            ));
          }
          return null;
        })}
      </SideBarToggleButtonGroup>
    </motion.aside>
  );
};

export default SideBar;
