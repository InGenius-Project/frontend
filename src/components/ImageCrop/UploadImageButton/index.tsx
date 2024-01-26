import { Box, Button, ButtonProps, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

type UploadImageButtonProps = {
  width?: number | string;
  height?: number | string;
};

function UploadImageButton({
  width,
  height,
  children,
  ...props
}: ButtonProps & UploadImageButtonProps & React.PropsWithChildren) {
  const theme = useTheme();
  const [displayHover, setDisplayHover] = React.useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setDisplayHover(true)}
      onMouseLeave={() => setDisplayHover(false)}
      sx={{
        overflow: "hidden",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${props.color}`,
        padding: 0,
        width,
        height,
      }}
    >
      <motion.div
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        style={{
          display: displayHover ? "flex" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: theme.zIndex.tooltip,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={displayHover ? "open" : "closed"}
      >
        變更圖片
      </motion.div>

      {children}
    </Button>
  );
}

export default UploadImageButton;
