import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "components/SideBar";
import UserHeader from "components/UserHeader";
import { AnimatePresence, useCycle } from "framer-motion";

export default function UserRoute() {
  const [open, setOpen] = useCycle(false, true);

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexFlow: "row",
      }}
    >
      <AnimatePresence>{open && <Sidebar />}</AnimatePresence>

      <Box
        sx={{
          minHeight: "calc(100vh - var(--lng-height-navbar))",
          flex: "1 1 auto",
        }}
      >
        <UserHeader toggle={open} onToggle={setOpen} />
        <Outlet />
      </Box>
    </Box>
  );
}
