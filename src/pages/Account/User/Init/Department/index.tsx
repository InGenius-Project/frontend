import AnalyzeSvg from '@/assets/images/svg/analyze.svg?react';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Container, InputAdornment, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function InitDepartment() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid mobile={6}>
          <Typography variant="h2">你的科系</Typography>
          <Typography variant="caption">選擇你的科系，讓我們提共更精確的實習給你</Typography>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            options={[]}
          />
        </Grid>
        <Grid
          mobile={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnalyzeSvg
            style={{
              width: '60%',
              height: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default InitDepartment;
