import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "components/Footer";
import Sidebar from "components/SideBar";

export default function UserRoute() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexFlow: "row",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: "calc(100vh - var(--lng-height-navbar))",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
