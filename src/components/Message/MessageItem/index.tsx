import { Avatar, Box, Chip, Typography } from "@mui/material";
import React from "react";

interface MessageItemProps {
  align: "left" | "right";
}

function MessageItem({ align }: MessageItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        maxWidth: "30em",
        alignItems: "flex-end",
        alignSelf: align === "left" ? "flex-start" : "flex-end",
        flexDirection: align === "left" ? "row" : "row-reverse",
      }}
    >
      <Box
        sx={{
          height: "100%",
          alignSelf: "center",
        }}
      >
        <Avatar sx={{ width: "1.5em", height: "1.5em" }}></Avatar>
      </Box>
      <Chip
        label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nesciunt
        sed repellat quos laboriosam optio porro doloremque ratione,
        consequuntur reprehenderit ut labore tempora, architecto dolorem velit
        magnam dolores hic aperiam."
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
          },
          p: 1,
        }}
        color={align === "left" ? "default" : "primary"}
      />
      <Typography variant={"caption"}>19:30</Typography>
    </Box>
  );
}

export default MessageItem;
