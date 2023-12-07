import { Stack, useTheme, Box, Checkbox, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAnimate, motion } from "framer-motion";
import React from "react";

type AreaControlProps = {
  top: number | undefined;
  disabled?: boolean;
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AreaControl = ({
  top,
  disabled,
  onAddClick,
  onDeleteClick,
  onEditClick,
}: AreaControlProps) => {
  const theme = useTheme();
  const [motionRef, animate] = useAnimate();

  React.useEffect(() => {
    animate(motionRef.current, { top });
  }, [top, motionRef, animate]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onAddClick && onAddClick(event);
  };

  return (
    <motion.div
      ref={motionRef}
      style={{
        position: "absolute",
        top: 0,
        width: "var(--ing-width-areaControl)",
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
            onClick={handleAddClick}
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
