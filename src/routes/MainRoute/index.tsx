import { Box } from "@mui/material";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function MainRoute() {
  const outlet = useOutlet();
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

      <AnimatePresence mode="wait">
        <motion.main key={useLocation().pathname}>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              minHeight: "calc(100vh - var(--lng-height-navbar))",
              justifyContent: "center",
            }}
          >
            {outlet}{" "}
          </Box>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </Box>
  );
}
