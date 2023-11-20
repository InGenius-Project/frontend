import { Stack, useTheme, Box, Checkbox, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAnimate, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

type AreaControlProps = {
  top: number | undefined;
};

const AreaControl = ({ top }: AreaControlProps) => {
  const theme = useTheme();
  const [motionRef, animate] = useAnimate();
  const navigate = useNavigate();

  React.useEffect(() => {
    animate(motionRef.current, { top });
  }, [top, motionRef, animate]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("New");
  };

  return (
    <motion.div
      ref={motionRef}
      style={{
        position: "absolute",
        top: 0,
        width: "var(--lng-width-areaControl)",
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
            size="small"
            onClick={handleAddClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Checkbox
          icon={<VisibilityIcon />}
          checkedIcon={<VisibilityOffIcon />}
          size="small"
          onMouseDown={(e) => e.preventDefault()}
        />
        <Box>
          <IconButton size="small" onMouseDown={(e) => e.preventDefault()}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton size="small" onMouseDown={(e) => e.preventDefault()}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
    </motion.div>
  );
};

export default AreaControl;
