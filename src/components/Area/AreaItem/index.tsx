import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { PropsWithChildren } from "react";

type AreaItemProps = {
  onClick?: (top: number | undefined) => void;
  title?: string;
};

const AreaItem = ({
  onClick,
  title,
  children,
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
      {isHover && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            cursor: "move",
          }}
        >
          <DragHandleIcon color="primary" />
        </Box>
      )}
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
