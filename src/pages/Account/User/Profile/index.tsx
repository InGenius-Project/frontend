import { Box, Stack } from "@mui/material";
import AreaItem, { AreaItemControl } from "components/AreaItem";
import React from "react";

export default function Profile() {
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);

  const handleClick = (number: number | undefined) => {
    setControlTop(number);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        gap: 1,
      }}
      id="area-control"
    >
      <Stack
        spacing={1}
        sx={{
          flex: "1 1 auto",
          position: "relative",
        }}
      >
        <AreaItem onClick={handleClick} />
        <AreaItem onClick={handleClick} />
        <AreaItem onClick={handleClick} />
      </Stack>

      <Box
        sx={{
          flexShrink: 0,
          width: "var(--lng-width-areaControl)",
          position: "relative",
        }}
      >
        <AreaItemControl top={controlTop} />
      </Box>
    </Box>
  );
}
