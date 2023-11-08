import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mb={2}>
        Login
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
        <Button variant="contained">Login</Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/Account/Register")}
        >
          Register
        </Button>

        <Link href="/Account/Register" underline="always">
          Forget Password?
        </Link>
      </Stack>
    </Container>
  );
}
