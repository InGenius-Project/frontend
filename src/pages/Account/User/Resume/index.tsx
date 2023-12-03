import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetResumesQuery } from "features/api/resume/resume";
import { ResumeItem } from "components/Resume";

export default function Resume() {
  const { data: resumes, isLoading } = useGetResumesQuery(null);

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button variant="text" startIcon={<AddIcon />}>
          新增履歷
        </Button>
      </Box>
      <CssBaseline />

      <Stack spacing={1}>
        {isLoading && (
          <Stack
            spacing={2}
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={"2em"}></CircularProgress>
            <Typography>載入中</Typography>
          </Stack>
        )}

        {resumes &&
          resumes.Data &&
          resumes.Data.length > 0 &&
          resumes.Data.map((r) => (
            <ResumeItem
              title={r.Title}
              key={r.Id}
              id={r.Id}
              modifiedAt={new Date(r.ModifiedAt)}
            />
          ))}
      </Stack>
    </Stack>
  );
}
