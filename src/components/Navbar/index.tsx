import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Link, useTheme } from "@mui/material";
import { ReactComponent as Logo } from "assets/logo/logo.svg";

export default function ButtonAppBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: theme.spacing(2),
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Logo width={48} height={48} />
          <Typography
            variant="h5"
            component={"span"}
            fontWeight={theme.typography.fontWeightBold}
          >
            優創
          </Typography>
        </Box>

        {/* Links */}
        <Stack>
          <Link href="#">搜尋</Link>
        </Stack>

        {/* Right Control */}
        <Box>
          <Button variant="contained">登入</Button>
        </Box>
      </Box>
    </Container>
  );
}
