import Logo from '@/assets/images/logo/logo.svg?react';
import dummyUserImage from '@/assets/images/png/dummyUserImage.jpg';
import { getNavigationConfig } from '@/components/SideBar/navigationConfig';
import { useLoginMutation } from '@/features/api/auth/login';
import { baseApi } from '@/features/api/baseApi';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { logout } from '@/features/user/userSlice';
import { UserRole, UserRoleLoginData } from '@/types/enums/UserRole';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Container,
  FormControl,
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const env = import.meta.env.VITE_APP_ENV as string;

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.User);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [login] = useLoginMutation();
  const [role, setRole] = useState(user?.Role);
  const handleChange = (e: SelectChangeEvent<UserRole>) => {
    setRole((e.target as any).value);
    const loginData = UserRoleLoginData.find((u) => u.Id === e.target.value);
    login({
      email: loginData?.Email || '',
      password: loginData?.password || '',
    });
  };

  const handleLogout = () => {
    dispatch(logout()); // initial state
    baseApi.util.resetApiState(); // reset cache
  };

  return (
    <Container sx={{ height: 'var(--ing-height-navbar)' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: theme.spacing(2),
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <Logo width={48} height={48} />
          <Typography variant="h5" component={'span'} fontWeight={theme.typography.fontWeightBold}>
            優創
          </Typography>
        </Box>

        {/* Links */}
        <Stack>
          <Link href="#">搜尋</Link>
        </Stack>

        {/* Right Control */}
        <Box height="100%">
          {user ? (
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {env === 'development' && (
                <FormControl size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    value={role}
                    onChange={handleChange}
                  >
                    {UserRoleLoginData.map((item) => {
                      return (
                        <MenuItem key={item.Id} value={item.Id}>
                          {item.Label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
              <Button
                variant="text"
                startIcon={
                  <img
                    src={dummyUserImage}
                    alt="userImage"
                    style={{
                      height: 32,
                      borderRadius: '50%',
                      objectFit: 'contain',
                    }}
                  />
                }
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
              >
                {user.Username}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {getNavigationConfig(user?.Role || 0)?.map((item) => {
                  return (
                    <MenuItem
                      key={`header-menu-item-${item.value}`}
                      onClick={() => navigate(`/Account/User/${item.value}`)}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}

                <MenuItem onClick={handleLogout}>登出</MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Button variant="contained" onClick={() => navigate('/Account/Login')}>
              登入
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
