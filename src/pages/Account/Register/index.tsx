import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Register() {
  return (
    <Container>
      <Typography variant="h4" mb={2}>
        Register
      </Typography>

      <Stack spacing={2}>
        <TextField label="Account" variant="standard" />

        <TextField label="Password" type="password" variant="standard" />
      </Stack>

      <Stack
        direction={"row"}
        spacing={2}
        mt={2}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Button variant="contained">Register</Button>
        <Button variant="outlined">Cancel</Button>

        <Link href="/Account/Register" underline="always">
          Forget Password?
        </Link>
      </Stack>
    </Container>
  );
}
