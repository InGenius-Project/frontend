import { Box, Container, Divider, IconButton, Link, Stack, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.primary.lighter }}>
      <Divider />
      <Container sx={{ py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Stack spacing={1}>
            <Stack direction={'row'} spacing={2}>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <EmailIcon />
              </IconButton>
              <IconButton>
                <PhoneIcon />
              </IconButton>
            </Stack>
            <Stack direction={'row'} spacing={2}>
              <Link>首頁</Link>
              <Link>關於我們</Link>
              <Link>隱私政策</Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
