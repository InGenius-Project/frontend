import { Box, CircularProgress, Container } from "@mui/material";
import { calcLength } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <Container
      sx={{ height: "calc(100vh-var(--ing-height-navbar))", width: "100%" }}
      data-testid="fullscreen-loader"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
        gap={2}
      >
        <CircularProgress />
        載入中，請稍後
      </Box>
    </Container>
  );
};

export default FullScreenLoader;
