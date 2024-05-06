import LoginSvg from '@/assets/images/svg/login.svg?react';
import FormInput from '@/components/FormInput';
import { useLoginMutation } from '@/features/api/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Container, InputAdornment, Link, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import { userAuthVariants } from './../../../assets/motion/variants';
import { IResponse } from '@/types/interfaces/IResponse';
import { useGetUserQuery } from '@/features/api/user/getUser';

const loginSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string().min(1, 'Password is required'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [login, { isLoading: isLogining, isSuccess }] = useLoginMutation();
  const { isLoading: isGetingUser } = useGetUserQuery();
  const [error, setError] = useState<string>('');

  // Previous page
  const from = ((location.state as any)?.from.pathname as string) || '/Account/User';

  // Set up form
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  useEffect(() => {
    if (isSuccess) {
      navigate(from);
    }
  }, [navigate, from, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    login(values)
      .unwrap()
      .catch((e) => {
        setError(e.data.responseException?.exceptionMessage || '');
      });
  };

  return (
    <Box
      sx={{
        alignSelf: 'center',
        flexGrow: 1,
      }}
    >
      <Container>
        <Grid
          container
          sx={{
            width: '100%',
          }}
        >
          <Grid
            tablet={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoginSvg width={'70%'} />
          </Grid>
          <Grid mobile={12} tablet={6}>
            <motion.div variants={userAuthVariants} initial="initial" animate="animate">
              <FormProvider {...methods}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(3),
                  }}
                  noValidate
                  component="form"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Typography variant="h3">登入</Typography>

                  <FormInput
                    name="email"
                    type="email"
                    label="信箱"
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
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems={'flex-end'}>
                    <LoadingButton type="submit" variant="contained" loading={isLogining || isGetingUser}>
                      登入
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => navigate('/Account/Register')}>
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
