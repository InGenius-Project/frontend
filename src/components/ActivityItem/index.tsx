import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ImageFrame from "@/assets/images/png/imageFrame.png";
import ShareIcon from "@mui/icons-material/Share";
import { Chip, Stack } from "@mui/material";

export default function ActivityItem() {
  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        height: {
          mobile: 130,
          tablet: 150,
          laptop: 180,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <CardMedia
          component="img"
          sx={{
            width: {
              mobile: 100,
              tablet: 120,
              laptop: 150,
            },
          }}
          image={ImageFrame}
        />

        <CardContent sx={{ flex: "1 1 auto" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row">
              <Chip
                variant="outlined"
                label="講座"
                color="primary"
                sx={{ mr: 1 }}
              />
              <Stack direction="column">
                <Typography variant="h4">標題</Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  2023/10/01
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
              }}
            >
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>

              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="body1"
            whiteSpace={"pre-line"}
            textOverflow={"ellipsis"}
            sx={{}}
          >
            Lorem ipsum dolor sit amet consectetur. Volutpat in imperdiet orci a
            felis et. Tincidunt ut
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export function ActivityColumnItem() {
  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Stack direction={"row"} sx={{ padding: 2 }}>
          <Chip
            variant="outlined"
            label="講座"
            color="primary"
            sx={{ mr: 1 }}
          />
          <Stack direction={"column"}>
            <Typography variant="h4">標題</Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              2023/10/01
            </Typography>
          </Stack>
        </Stack>

        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "200px",
          }}
          image={ImageFrame}
        />

        <CardContent sx={{ flex: "1 1 auto" }}>
          <Typography
            variant="body1"
            whiteSpace={"pre-line"}
            textOverflow={"ellipsis"}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis at,
            voluptatum ipsam fugit deserunt libero eveniet incidunt provident
            accusamus possimus numquam tempore nostrum reiciendis, debitis ut
            aliquid porro nesciunt impedit! sectetur. Volutpat in imperdiet orci
            a felis et. Tincidunt ut
          </Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
