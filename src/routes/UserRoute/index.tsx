import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "components/SideBar";
import UserHeader from "components/UserHeader";

export default function UserRoute() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("laptop"));
  const [toggle, setToggle] = React.useState(true);

  React.useEffect(() => {
    setToggle(matches);
  }, [matches]);

  React.useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    newState: boolean
  ) => {
    setToggle(newState);
  };

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexFlow: "row",
      }}
    >
      <Sidebar toggle={toggle} onToggle={handleToggle} />

      <Box
        sx={{
          minHeight: "calc(100vh - var(--lng-height-navbar))",
          flex: "1 1 auto",
        }}
      >
        <UserHeader toggle={toggle} onToggle={handleToggle} />
        <Outlet />
      </Box>
    </Box>
  );
}
