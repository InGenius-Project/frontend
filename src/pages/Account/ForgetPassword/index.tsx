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
import LoginSvg from "@/assets/images/svg/login.svg?react";
import { Link as RouterLink } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";

export default function Register() {
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
            <motion.div
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: 100,
                opacity: 0,
              }}
              transition={{
                type: "linear",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h3">忘記密碼</Typography>
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
                <Stack direction="row" spacing={2} alignItems={"flex-end"}>
                  <Button>送出</Button>
                  <Button variant="outlined">重新送出驗證碼</Button>
                  <Link component={RouterLink} to="/Account/Login">
                    已有帳號，直接登入
                  </Link>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
