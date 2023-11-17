import { Box, Stack } from "@mui/material";
import AreaItem, { AreaItemControl } from "components/AreaItem";
import React from "react";

export default function Profile() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        gap: 1,
      }}
    >
      <Stack
        spacing={1}
        sx={{
          flex: "1 1 auto",
        }}
      >
        <AreaItem />
        <AreaItem />
        <AreaItem />
      </Stack>

      <Box
        sx={{
          flexShrink: 0,
          width: "var(--lng-width-areaControl)",
          position: "relative",
        }}
      >
        <AreaItemControl />
      </Box>
    </Box>
  );
}
