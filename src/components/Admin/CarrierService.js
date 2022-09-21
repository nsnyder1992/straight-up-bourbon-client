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

const CarrierService = ({
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
      <InputLabel htmlFor="outlined-age-native-simple">
        Carrier Service
      </InputLabel>
      <Select
        native
        value={type}
        onChange={handleChange}
        label="Carrier Service"
        inputProps={{
          name: "type",
          id: "outlined-age-native-simple",
        }}
      >
        <option value={null}></option>
        <option value={"ups_ground"}>{"UPS Ground (2-5days)"}</option>
      </Select>
    </FormControl>
  );
};

export default CarrierService;
