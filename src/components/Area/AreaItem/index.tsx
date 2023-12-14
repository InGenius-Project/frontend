import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { PropsWithChildren } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

export type AreaItemProps = {
  onClick?: (top: number | undefined) => void;
  id: string;
  title?: string;
  dragProps?: DraggableProvidedDragHandleProps | null; // for drag handle
};

const AreaItem = ({
  onClick,
  title,
  children,
  dragProps,
}: PropsWithChildren<AreaItemProps>) => {
  const [isHover, setIsHover] = React.useState(false);
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    onClick && onClick(ref.current?.offsetTop);
  };

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: "relative",
        "&:focus": {
          "&::before": {
            content: '""',
            height: "100%",
            position: "absolute",
            borderRadius: 4,
            left: 0,
            top: 0,
            backgroundColor: theme.palette.primary.main,
            width: 5,
          },
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick()}
      onBlur={(e) => {
        if (e.relatedTarget === null) {
          e.target.focus();
        }
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          justifyContent: "center",
          cursor: "move",
          display: isHover ? "flex" : "none",
        }}
        {...dragProps}
      >
        <DragHandleIcon color="primary" />
      </Box>
      <Stack spacing={1}>
        <Typography variant="h4">{title ? title : "標題"}</Typography>
        {children ? (
          children
        ) : (
          <Box width="100%">
            <Typography variant="caption">暫無內容</Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default AreaItem;
