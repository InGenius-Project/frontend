import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { UserRole } from "types/enums/UserRole";

const navigationConfig = [
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
      {
        name: "訊息",
        value: "Message",
        icon: <MessageOutlinedIcon />,
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
      {
        name: "訊息",
        value: "Message",
        icon: <MessageOutlinedIcon />,
      },
    ],
  },
  {
    role: UserRole.Admin,
    items: [],
  },
  {
    role: UserRole.InternalUser,
    items: [
      {
        name: "標籤管理",
        value: "Manage/Tag",
        icon: <LocalOfferOutlinedIcon />,
      },
      {
        name: "區塊管理",
        value: "Manage/Area",
        icon: <DashboardOutlinedIcon />,
      },
      {
        name: "訊息",
        value: "Message",
        icon: <MessageOutlinedIcon />,
      },
    ],
  },
];
export const getNavigationConfig = (role: UserRole) => {
  return navigationConfig.find((config) => config.role === role)?.items;
};
