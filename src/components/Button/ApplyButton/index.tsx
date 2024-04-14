import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type ApplyButtonProps = {
  recruitmentId: string;
};

function ApplyButton({ recruitmentId }: ApplyButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickApply = () => {
    navigate(`/Account/User/Intern/Recruitment/Apply/${recruitmentId}`, {
      state: {
        from: location,
      },
    });
  };
  return <Button onClick={handleClickApply}>應徵</Button>;
}

export default ApplyButton;
