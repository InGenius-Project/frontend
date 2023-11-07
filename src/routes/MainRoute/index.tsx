import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function MainRoute() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Navbar />

      <Box
        py={2}
        sx={{
          flexGrow:1
        }}
      > 
        <Outlet />
      </Box>
    </Box>
  );
}
