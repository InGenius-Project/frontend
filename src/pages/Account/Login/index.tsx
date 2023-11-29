import {
  Box,
  Button,
  Container,
  InputAdornment,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReactComponent as LoginSvg } from "assets/images/svg/login.svg";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import Lock from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { TypeOf, object, string } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FormInput from "components/FormInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLoginMutation } from "features/api/auth/login";
import { getUserApi } from "features/api/user/getUser";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string().min(1, "Password is required"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export default function Login() {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const from =
    ((location.state as any)?.from.pathname as string) || "/Account/User";

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("登入成功");
      navigate(from);
    }
  }, [isLoading, navigate, from, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

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
              <FormProvider {...methods}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(3),
                  }}
                  noValidate
                  component="form"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Typography variant="h3">登入</Typography>
                  <Stack spacing={2} direction="row">
                    <Link>一般</Link>
                    <Link>企業</Link>
                  </Stack>
                  <FormInput
                    name="email"
                    type="email"
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
                  <FormInput
                    name="password"
                    type="password"
                    label="密碼"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack direction="row" spacing={2} alignItems={"flex-end"}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                    >
                      登入
                    </LoadingButton>
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
                </Box>
              </FormProvider>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
