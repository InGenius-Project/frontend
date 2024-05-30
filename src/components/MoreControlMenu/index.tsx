import MoreVert from '@mui/icons-material/MoreVert';
import { IconButton, Menu } from '@mui/material';
import React from 'react';

function MoreControlMenu({ children }: React.PropsWithChildren) {
  // Control Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openControl = Boolean(anchorEl);
  const handleOpenControl = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseControl = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenControl}>
        <MoreVert />
      </IconButton>
      <Menu open={openControl} anchorEl={anchorEl} onClose={handleCloseControl}>
        {children}
      </Menu>
    </>
  );
}

export default MoreControlMenu;
