import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

function RadioButtons({ label, option_values, dispatch }) {
  const default_value = option_values.filter((o) => !!o["is_default"])[0][
    "label"
  ];
  const [value, setValue] = useState(default_value);

  // would use the name or id if in production
  const handleChange = (e) => {
    dispatch({ type: "subscribe", payload: e.target.value });
    setValue(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
        row
      >
        {option_values.map((o) => {
          const { label: option_label, id } = o;
          return (
            <FormControlLabel
              value={option_label}
              control={<Radio />}
              label={option_label}
              key={id}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtons;
