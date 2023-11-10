import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReactComponent as WorkInProgress } from "assets/images/work-in-progress.svg";
import Typography from "@mui/material/Typography";
import { Box, Button, useTheme } from "@mui/material";

export default function Root() {
  const theme = useTheme();

  return (
    <>
      {/* Hero */}
      <Container>
        <Grid
          container
          sx={{
            alignItems: "flex-end",
          }}
          spacing={theme.spacing(6)}
        >
          <Grid
            tablet={6}
            laptop={4}
            sx={{ alignItems: "flex-end", paddingTop: theme.spacing(20) }}
          >
            <WorkInProgress width="100%" />
          </Grid>
          <Grid
            tablet={6}
            laptop={8}
            sx={{
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1),
              }}
            >
              <Typography variant="h2" sx={{ flexGrow: 1 }}>
                優創
              </Typography>
              <Typography variant="h3">Innovative Genius</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
              <Box sx={{ flexGrow: 2 }}>
                <Button>開始探索</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Trending */}
      <Container></Container>
    </>
  );
}
