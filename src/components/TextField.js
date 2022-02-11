import { TextField as MuiTextField } from "@mui/material";

function TextField({ formData, label, dispatch }) {
  // if I had more time, implement validation here
  return (
    <MuiTextField
      label={label}
      value={formData["name"] ?? ""}
      onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
      fullWidth
      size="small"
    />
  );
}

export default TextField;
