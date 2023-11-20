import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Edit() {
  const params = useParams();
  return (
    <TextField
      label="標題"
      value={params.type ? params.type : ""}
      disabled={params.type ? true : false}
      fullWidth
    />
  );
}
