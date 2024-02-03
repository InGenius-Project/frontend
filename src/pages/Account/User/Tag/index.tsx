import { Stack } from "@mui/material";
import TagTypeForm from "./components/TagTypeForm";
import TagForm from "./components/TagForm";

function Tag() {
  return (
    <Stack spacing={1}>
      <TagTypeForm />
      <TagForm />
    </Stack>
  );
}

export default Tag;
