import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Link,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { ReactComponent as Logo } from "assets/images/logo/logo.svg";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { useAppDispatch, useAppSelector } from "features/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { logout } from "features/user/userSlice";
import { baseApi } from "features/api/baseApi";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // initial state
    baseApi.util.resetApiState(); // reset cache
  };

  return (
    <Container sx={{ height: "var(--ing-height-navbar)" }}>
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
        <Box height="100%">
          {user ? (
            <>
              <Button
                variant="text"
                startIcon={
                  <img
                    src={dummyUserImage}
                    alt="userImage"
                    style={{
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                }
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
              >
                {user.username}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/Account/User/Profile")}>
                  個人首頁
                </MenuItem>
                <MenuItem onClick={() => navigate("/Account/User/Resume")}>
                  實習管理
                </MenuItem>
                <MenuItem onClick={handleLogout}>登出</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              data-testid="header__login"
              onClick={() => navigate("/Account/Login")}
            >
              登入
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
