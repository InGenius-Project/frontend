import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  id: string;
  title?: string;
  focused?: boolean;
  dragProps?: DraggableProvidedDragHandleProps | null; // for drag handle
};

const AreaItem = ({
  onClick,
  title,
  children,
  dragProps,
  focused,
}: PropsWithChildren<AreaItemProps>) => {
  const [isHover, setIsHover] = React.useState(false);
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [focusedState, setFocusState] = useState(false);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    onClick && onClick(ref.current as HTMLElement);
  };

  useEffect(() => {
    setFocusState(focused ? focused : false);
  }, [focused]);

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: "relative",
        "&::before": focusedState
          ? {
              content: '""',
              height: "100%",
              position: "absolute",
              borderRadius: 4,
              left: 0,
              top: 0,
              backgroundColor: theme.palette.primary.main,
              width: 5,
            }
          : undefined,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick()}
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
