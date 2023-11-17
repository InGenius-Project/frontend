import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "components/SideBar";
import UserHeader from "components/UserHeader";
import { AnimatePresence, useCycle } from "framer-motion";

export default function UserRoute() {
  const [open, setOpen] = useCycle(false, true);

  return (
    <Container
      sx={{
        display: "flex",
        flexFlow: "row",
        flexGrow: 1,
      }}
    >
      <AnimatePresence>{open && <Sidebar />}</AnimatePresence>

      <Box
        sx={{
          minHeight: "calc(100vh - var(--lng-height-navbar))",
        }}
      >
        <UserHeader toggle={open} onToggle={setOpen} />
        <Box sx={{ my: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
