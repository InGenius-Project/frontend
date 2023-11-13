import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Link, useTheme } from "@mui/material";
import { ReactComponent as Logo } from "assets/images/logo/logo.svg";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container sx={{ height: "var(--lng-height-navbar)" }}>
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
          <Button
            variant="contained"
            onClick={() => navigate("/Account/Login")}
          >
            登入
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
