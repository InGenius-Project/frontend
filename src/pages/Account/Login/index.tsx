import {
  Box,
  Button,
  Container,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReactComponent as LoginSvg } from "assets/images/svg/login.svg";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Lock from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        alignSelf: "center",
        flexGrow: 1,
      }}
    >
      <Container>
        <Grid
          container
          sx={{
            width: "100%",
          }}
        >
          <Grid
            tablet={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginSvg width={"70%"} />
          </Grid>
          <Grid mobile={12} tablet={6}>
            <Stack spacing={3}>
              <Typography variant="h3">登入</Typography>
              <Stack spacing={2} direction="row">
                <Link>一般</Link>
                <Link>企業</Link>
              </Stack>
              <TextField
                label="帳號"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="密碼"
                required
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" spacing={2} alignItems={"flex-end"}>
                <Button onClick={() => navigate("/Account/User/Profile")}>
                  登入
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Account/Register")}
                >
                  註冊
                </Button>
                <Link component={RouterLink} to="/Account/ForgetPassword">
                  忘記密碼?
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
