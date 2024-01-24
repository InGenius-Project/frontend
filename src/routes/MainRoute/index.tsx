import { Box } from "@mui/material";
import Footer from "components/Footer";
import { getUserApi } from "features/api/user/getUser";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";

export default function MainRoute() {
  const { isLoading, isFetching } = getUserApi.endpoints.getUser.useQuery(
    null,
    {
      skip: false,
    }
  );

  const loading = isLoading || isFetching;

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        cursor: loading ? "wait" : undefined,
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
