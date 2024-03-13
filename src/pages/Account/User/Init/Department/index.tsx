import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { ReactComponent as AnalyzeSvg } from "assets/images/svg/analyze.svg";
import SearchIcon from "@mui/icons-material/Search";

function InitDepartment() {
  return (
    <Container>
      <Grid container>
        <Grid mobile={6}>
          <Typography variant="h2">你的科系</Typography>
          <Typography variant="caption">
            選擇你的科系，讓我們提共更精確的實習給你
          </Typography>
          <Autocomplete
            placeholder="搜尋你的科系"
            renderInput={(params) => (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )}
            options={[]}
          />
        </Grid>
        <Grid mobile={6}>
          <AnalyzeSvg />
        </Grid>
      </Grid>
    </Container>
  );
}

export default InitDepartment;
