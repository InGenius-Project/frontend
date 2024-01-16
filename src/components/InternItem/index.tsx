import { Box, Chip, IconButton, Link, Stack, useTheme } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "features/store";
import { UserRole } from "types/DTO/UserDTO";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function InternItem() {
  const theme = useTheme();
  const userState = useAppSelector((state) => state.userState);

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
        <Chip label={"社群管理"} color="primary" icon={<TagIcon />} />
      </Stack>
      {(!userState || userState?.User?.Role === UserRole.Intern) && (
        <IconButton
          sx={{
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(1),
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
      {userState.User?.Role === UserRole.Company && (
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(1),
          }}
          spacing={1}
        >
          <IconButton>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton>
            <AnalyticsOutlinedIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}
