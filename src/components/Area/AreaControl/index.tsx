import { AddTooltipWrapper, DeleteTooltipWrapper } from '@/components/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Checkbox, CircularProgress, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type AreaControlProps = {
  top: number | undefined;
  disabled?: boolean;
  visibled?: boolean;
  isLoadingAdd?: boolean;
  isLoadingDelete?: boolean;
  isLoadingVisibility?: boolean;
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  onVisibilityChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const AreaControl = ({
  top,
  disabled,
  visibled,
  isLoadingAdd,
  isLoadingDelete,
  isLoadingVisibility,
  onAddClick,
  onDeleteClick,
  onVisibilityChange,
}: AreaControlProps) => {
  const theme = useTheme();
  const [motionRef, animate] = useAnimate();
  const [visibledCheckState, setVisibledCheckState] = useState(visibled);

  useEffect(() => {
    setVisibledCheckState(visibled);
  }, [visibled]);

  React.useEffect(() => {
    if (motionRef.current.parentElement.clientHeight - (top || 0) - motionRef.current.clientHeight > 0) {
      animate(motionRef.current, { top });
    } else {
      animate(motionRef.current, {
        top: motionRef.current.parentElement.clientHeight - motionRef.current.clientHeight,
      });
    }
  }, [top, motionRef, animate]);

  return (
    <motion.div
      ref={motionRef}
      style={{
        position: 'absolute',
        top: 0,
        width: 'var(--ing-width-area-control)',
        height: 'var(--ing-height-area-control)',
      }}
    >
      <Stack
        spacing={1}
        sx={{
          backgroundColor: theme.palette.common.white,
          height: 'fit-content',
          padding: 1,
          alignItems: 'center',
        }}
      >
        {/* Adding Button */}
        <Box>
          <AddTooltipWrapper>
            <IconButton disabled={disabled} size="small" onClick={onAddClick} onMouseDown={(e) => e.preventDefault()}>
              {isLoadingAdd ? <CircularProgress size={20} /> : <AddIcon />}
            </IconButton>
          </AddTooltipWrapper>
        </Box>

        {/* Visibility Button */}
        {isLoadingVisibility ? (
          <CircularProgress size={20} />
        ) : (
          <Tooltip title={disabled ? '公開' : '隱藏'}>
            <Checkbox
              icon={<VisibilityIcon />}
              disabled={disabled}
              checkedIcon={<VisibilityOffIcon />}
              size="small"
              checked={!visibledCheckState}
              onChange={onVisibilityChange}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Tooltip>
        )}

        {/* Delete Button */}
        <Box>
          <DeleteTooltipWrapper>
            <IconButton
              size="small"
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={onDeleteClick}
            >
              {isLoadingDelete ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </DeleteTooltipWrapper>
        </Box>
      </Stack>
    </motion.div>
  );
};

export default AreaControl;
