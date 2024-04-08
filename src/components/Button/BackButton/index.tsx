import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';
  return (
    <Button onClick={() => navigate(from)} variant="text" startIcon={<ArrowBackIcon />}>
      返回
    </Button>
  );
}

export default BackButton;
