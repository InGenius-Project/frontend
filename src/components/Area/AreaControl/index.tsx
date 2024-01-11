import { Stack, useTheme, Box, Checkbox, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAnimate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type AreaControlProps = {
  top: number | undefined;
  disabled?: boolean;
  visibled?: boolean;
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
  onVisibilityChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

const AreaControl = ({
  top,
  disabled,
  visibled,
  onAddClick,
  onDeleteClick,
  onEditClick,
  onVisibilityChange,
}: AreaControlProps) => {
  const theme = useTheme();
  const [motionRef, animate] = useAnimate();
  const [visibledCheckState, setVisibledCheckState] = useState(visibled);

  useEffect(() => {
    setVisibledCheckState(visibled);
  }, [visibled]);

  React.useEffect(() => {
    // animate(motionRef.current, { top });。
    if (
      motionRef.current.parentElement.clientHeight -
        (top || 0) -
        motionRef.current.clientHeight >
      0
    ) {
      animate(motionRef.current, { top });
    } else {
      animate(motionRef.current, {
        top:
          motionRef.current.parentElement.clientHeight -
          motionRef.current.clientHeight,
      });
    }
  }, [top, motionRef, animate]);

  return (
    <motion.div
      ref={motionRef}
      style={{
        position: "absolute",
        top: 0,
        width: "var(--ing-width-area-control)",
        height: "var(--ing-height-area-control)",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          backgroundColor: theme.palette.common.white,
          height: "fit-content",
          padding: 1,
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            disabled={disabled}
            size="small"
            onClick={onAddClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Checkbox
          icon={<VisibilityIcon />}
          disabled={disabled}
          checkedIcon={<VisibilityOffIcon />}
          size="small"
          checked={!visibledCheckState}
          onChange={onVisibilityChange}
          onMouseDown={(e) => e.preventDefault()}
        />
        <Box>
          <IconButton
            size="small"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onEditClick}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="small"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
    </motion.div>
  );
};

export default AreaControl;
