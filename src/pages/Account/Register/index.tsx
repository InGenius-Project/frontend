import LoginSvg from '@/assets/images/svg/login.svg?react';
import FormInput from '@/components/FormInput';
import { useRegisterMutation } from '@/features/api/auth/register';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, InputAdornment, Link, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';

const registerSchema = object({
  Username: string().min(1, '請輸入名稱').max(100),
  Email: string().min(1, '請輸入帳號').email('請輸入正確的帳號格式'),
  Password: string().min(1, '請輸入密碼').min(8, '密碼必須大於8個字元').max(32, '密碼必須小於32個字元'),
  PasswordConfirm: string().min(1, '請確認密碼'),
}).refine((data) => data.Password === data.PasswordConfirm, {
  path: ['PasswordConfirm'],
  message: '密碼不相符',
});

export type RegisterInput = Omit<TypeOf<typeof registerSchema>, 'PasswordConfirm'>;

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { isLoading, isSuccess }] = useRegisterMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigate('/Account/User/Init/Department');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser({
      Username: values.Username,
      Email: values.Email,
      Password: values.Password,
      Role: role,
    });
  };

  const [role, setRole] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setRole(newValue);
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
                type: 'linear',
              }}
            >
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
                  <Typography variant="h3">註冊</Typography>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={role} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="一般" value={0} />
                      <Tab label="企業端" value={1} />
                      {import.meta.env.VITE_APP_ENV === 'development' && <Tab label="管理員" value={2} />}
                      {import.meta.env.VITE_APP_ENV === 'development' && <Tab label="內部管理員" value={3} />}
                    </Tabs>
                  </Box>

                  <FormInput
                    label="帳號"
                    required
                    name="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormInput
                    label="名稱"
                    required
                    name="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RateReviewIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormInput
                    label="密碼"
                    required
                    name="Password"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormInput
                    label="確認密碼"
                    required
                    name="PasswordConfirm"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Stack direction="row" spacing={2} alignItems={'flex-end'}>
                    <LoadingButton variant="contained" loading={isLoading} type="submit">
                      註冊
                    </LoadingButton>
                    <Link component={RouterLink} to="/Account/Login">
                      已有帳號，直接登入
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
