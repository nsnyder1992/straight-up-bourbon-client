import React from "react";

import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 250,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CarrierCode = ({
  type,
  handleChange,
  variant = "outlined",
  required = false,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      variant={variant}
      className={classes.formControl}
      required={required}
    >
      <InputLabel htmlFor="outlined-age-native-simple">Carrier Code</InputLabel>
      <Select
        native
        required={required}
        value={type}
        onChange={handleChange}
        label="Carrier Code"
        inputProps={{
          name: "code",
          id: "outlined-age-native-simple",
        }}
      >
        <option value={null}></option>
        <option value={"ups"}>UPS</option>
      </Select>
    </FormControl>
  );
};

export default CarrierCode;
