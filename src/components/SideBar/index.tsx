import { useAppSelector } from '@/features/store';
import { useMediaQuery } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationConfig } from './navigationConfig';

const SideBarToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(1),
    border: 0,
  },
}));

const SideBarButton = styled(ToggleButton)(({ theme }) => ({
  position: 'relative',
  px: theme.spacing(2),
  justifyContent: 'flex-start',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  gap: theme.spacing(1),
}));

const SideBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.User);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const [currentTab, setCurrentTab] = React.useState('profile');

  const handleNavigate = (event: React.MouseEvent<HTMLElement>, newTab: string) => {
    setCurrentTab(newTab);
    navigate(newTab ? `/Account/User/${newTab}` : '/Account/User');
  };

  return !isMobile ? (
    <motion.aside
      style={{ flexShrink: 0 }}
      initial={{ x: -100, width: 0, opacity: 0 }}
      animate={{ x: 0, width: isMobile ? '4em' : 'var(--ing-width-sidebar)', opacity: 1 }}
      exit={{
        x: -100,
        width: 0,
        opacity: 0,
      }}
      transition={{
        type: 'linear',
      }}
    >
      <SideBarToggleButtonGroup
        color="primary"
        orientation="vertical"
        exclusive
        value={currentTab}
        onChange={handleNavigate}
        sx={{ width: '100%', position: 'sticky', top: 0 }}
      >
        {(getNavigationConfig(user?.Role || 0) || []).map((item) => (
          <SideBarButton key={item.name} value={item.value}>
            {item.icon}
            {item.name}
          </SideBarButton>
        ))}
      </SideBarToggleButtonGroup>
    </motion.aside>
  ) : null;
};

export default SideBar;
