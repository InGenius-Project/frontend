import { Box, Button, IconButton, Link, Stack, useTheme } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
export default function InternItem() {
  const theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: theme.palette.common.white,
        position: "relative",
        borderRadius: "var(--ing-borderRadius-sm)",
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h4">社群行銷助理</Typography>
      <Box>
        <Link href="#" color={theme.palette.info.main}>
          網路股份有限公司
        </Link>
        <Typography variant="caption"> | </Typography>
        <Typography variant="caption">台北市南港區</Typography>
      </Box>
      <Stack spacing={1} direction={"row"}>
        <Button>社群管理</Button>
        <Button>行銷企劃</Button>
      </Stack>
      <IconButton
        sx={{
          position: "absolute",
          top: theme.spacing(1),
          right: theme.spacing(1),
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>
    </Stack>
  );
}
