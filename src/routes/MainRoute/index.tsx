import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "components/Footer";

export default function MainRoute() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: "calc(100vh - var(--lng-height-navbar))",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
