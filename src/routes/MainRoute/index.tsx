import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "components/Footer";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      <ToastContainer />

      <AnimatePresence mode="wait">
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            minHeight: "calc(100vh - var(--ing-height-navbar))",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </AnimatePresence>

      <Footer />
    </Box>
  );
}
