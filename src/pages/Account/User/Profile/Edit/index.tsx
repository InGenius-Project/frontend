import { Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

export default function Edit() {
  const params = useParams();
  const [value, setValue] = React.useState("");

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="標題"
          value={params.type ? params.type : ""}
          disabled={params.type ? true : false}
          fullWidth
        />
        <Typography variant="h4">內容</Typography>

        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Stack>
    </Paper>
  );
}
