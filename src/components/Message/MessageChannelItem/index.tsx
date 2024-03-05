import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function MessageChannelItem() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <ButtonBase
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        gap: 2,
        overflow: "hidden",
        textAlign: "start",
        width: isMobile ? "fit-content" : undefined,
      }}
    >
      <Avatar></Avatar>
      {!isMobile && (
        <>
          <Stack
            spacing={1}
            sx={{ flex: "1 1 auto", justifyContent: "flex-start" }}
          >
            <Typography variant={"body1"}>UserName</Typography>
            <Typography
              variant="caption"
              sx={{
                width: "10em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at
              soluta, ullam assumenda officia fugiat dolorum. Est, asperiores
              ipsam quibusdam incidunt, cupiditate magnam cum aliquid dolorem
              sint alias error doloribus?
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
            1 分鐘前
          </Typography>
        </>
      )}
    </ButtonBase>
  );
}

export default MessageChannelItem;
