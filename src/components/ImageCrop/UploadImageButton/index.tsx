import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, ButtonProps, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

type UploadImageButtonProps = {
  width?: number | string;
  height?: number | string;
  circularCrop?: boolean;
};

function UploadImageButton({
  width,
  height,
  circularCrop,
  children,
  ...props
}: UploadImageButtonProps & React.PropsWithChildren & ButtonProps) {
  const theme = useTheme();
  const [displayHover, setDisplayHover] = React.useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setDisplayHover(true)}
      onMouseLeave={() => setDisplayHover(false)}
      style={{
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: circularCrop ? "50%" : theme.shape.borderRadius,
        border: "none",
        padding: 0,
        width,
        height,
      }}
    >
      {children}
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
          borderRadius: circularCrop ? "50%" : theme.shape.borderRadius,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={displayHover ? "open" : "closed"}
      >
        <FileUploadOutlinedIcon />
      </motion.div>
    </Button>
  );
}

export default UploadImageButton;
