import { TextField as MuiTextField } from "@mui/material";
import { useState } from "react";

function TextField({ formData, label, config, dispatch }) {
  // if I had more time, implement validation here
  const {
    default_value,
    text_characters_limited: is_limited,
    text_min_length: min,
    text_max_length: max,
  } = config;

  const [value, setValue] = useState(formData["name"] ?? default_value);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (is_limited && newValue.length > max) {
      setError(true);
    } else {
      dispatch({ type: "name", payload: newValue });
      setValue(newValue);
      if (is_limited && newValue.length < min) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <MuiTextField
      label={label}
      value={value}
      error={error}
      onChange={handleChange}
      fullWidth
      size="small"
      required
      helperText={
        error ? `Name has to be between ${min} and ${max} characters` : ""
      }
    />
  );
}

export default TextField;
