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
      }}
    >
      <Header />

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
