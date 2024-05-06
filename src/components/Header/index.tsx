import Logo from '@/assets/images/logo/logo.svg?react';
import { getNavigationConfig } from '@/components/SideBar/navigationConfig';
import { useLoginMutation } from '@/features/api/auth/login';
import { baseApi } from '@/features/api/baseApi';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { logout } from '@/features/user/userSlice';
import { UserRole, UserRoleLoginData } from '@/types/enums/UserRole';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Container,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OwnerAvatar } from '../UserAvatar';

const env = import.meta.env.VITE_APP_ENV as string;

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const userState = useAppSelector((state) => state.userState.User);
  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(navAnchorEl);
  const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNavAnchorEl(event.currentTarget);
  };

  const handleNavClose = () => {
    setNavAnchorEl(null);
  };

  const [login] = useLoginMutation();
  const [role, setRole] = useState(userState?.Role);
  const handleChange = (e: SelectChangeEvent<UserRole>) => {
    setRole((e.target as any).value);
    const loginData = UserRoleLoginData.find((u) => u.Id === e.target.value);

    login({
      email: loginData?.Email || '',
      password: loginData?.password || '',
    });
  };

  const handleLogout = () => {
    setNavAnchorEl(null);
    dispatch(logout()); // initial state
  };

  const handleNavigate = (value: string) => {
    setNavAnchorEl(null);
    navigate(`/Account/User/${value}`);
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
          {!isMobile && (
            <Typography variant="h5" component={'span'} fontWeight={theme.typography.fontWeightBold}>
              優創
            </Typography>
          )}
        </Box>

        {/* Right Control */}
        <Box height="100%">
          {userState ? (
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {env === 'development' && (
                <FormControl size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    value={role === null || role === undefined || UserRoleLoginData.length === 0 ? '' : role}
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

              {/* User Navigate */}
              {isMobile ? (
                <>
                  <IconButton onClick={handleNavClick}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer open={open} onClose={handleNavClose} anchor="right">
                    {getNavigationConfig(userState?.Role || 0)?.map((item) => {
                      return (
                        <MenuItem
                          key={`header-menu-item-${item.value}`}
                          onClick={() => handleNavigate(item.value)}
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: theme.spacing(1),
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </MenuItem>
                      );
                    })}
                    <MenuItem onClick={handleLogout}>登出</MenuItem>
                  </Drawer>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    startIcon={<OwnerAvatar size="1.5em" />}
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleNavClick}
                  >
                    {userState.Username}
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            <Button variant="contained" onClick={() => navigate('/Account/Login')}>
              登入
            </Button>
          )}
        </Box>

        <Menu anchorEl={navAnchorEl} open={!isMobile && open} onClose={handleNavClose}>
          {getNavigationConfig(userState?.Role || 0)?.map((item) => {
            return (
              <MenuItem
                key={`header-menu-item-${item.value}`}
                onClick={() => handleNavigate(item.value)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: theme.spacing(1),
                }}
              >
                {item.icon}
                {item.name}
              </MenuItem>
            );
          })}

          <MenuItem onClick={handleLogout}>登出</MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}
