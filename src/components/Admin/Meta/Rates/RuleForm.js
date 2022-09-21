import React, { useEffect } from "react";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RuleForm = ({
  submitName,
  handleSubmit,
  deleteName,
  handleDelete,
  rate,
  rule,
  rules,
  index,
  loading,
  error,
  children,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={3}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required={index == 0}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Rule Chain
          </InputLabel>
          <Select
            native
            value={rules?.types[index]}
            onChange={(e) => rules?.updateTypes(e.target.value, index)}
            label="Rule Type"
            inputProps={{
              name: "type",
              id: "outlined-age-native-simple",
            }}
            disabled={index == 0}
          >
            {index == 0 ? (
              <option value={"start"}></option>
            ) : (
              <>
                <option value={null}></option>
                <option value={"&&"}>AND</option>
                <option value={"||"}>OR</option>
              </>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel htmlFor="outlined-age-native-simple">Variable</InputLabel>
          <Select
            native
            value={rules?.variables[index]}
            onChange={(e) => rules.updateVariables(e.target.value, index)}
            label="Variable"
            inputProps={{
              name: "variable",
              id: "outlined-age-native-simple",
            }}
          >
            {rate.type == "shipping_rate" ? (
              <>
                <option value={null}></option>
                <option value={"total_weight"}>Total Weight</option>
                <option value={"total_cost"}>Total Cost</option>
              </>
            ) : (
              <>
                <option value={null}></option>
                <option value={"total_cost"}>Total Cost</option>
              </>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel htmlFor="outlined-age-native-simple">Check</InputLabel>
          <Select
            native
            value={rules?.rFunctions[index]}
            onChange={(e) => rules?.updateFunctions(e.target.value, index)}
            label="Rate Type"
            inputProps={{
              name: "type",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={null}></option>
            <option value={">"} align="center">
              {">"}
            </option>
            <option value={"<"} align="center">
              {"<"}
            </option>
            <option value={">="} align="center">
              {">="}
            </option>
            <option value={"<="} align="center">
              {"<="}
            </option>
            <option value={"=="} align="center">
              {"=="}
            </option>
            <option value={"!="} align="center">
              {"!="}
            </option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} style={{ margin: 8 }}>
        <TextField
          required
          multiline
          id="value-input"
          label="Rule Value"
          className="input-field"
          type="value"
          autoComplete="current-value"
          variant="outlined"
          onChange={(e) => rules?.updateValues(e.target.value, index)}
          value={rules?.values[index]}
        />
      </Grid>
      <Grid item xs={1} style={{ marginTop: 15 }}>
        <ButtonGroup spacing={2}>
          {rules.types.length == index + 1 ? (
            <Button
              // style={{ minWidth: 175 }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={<Add />}
            >
              {submitName}
            </Button>
          ) : null}
          {handleDelete && index > 0 ? (
            <Button
              //   style={{ minWidth: 175 }}
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              disabled={loading}
              startIcon={<Delete />}
            >
              {deleteName}
            </Button>
          ) : null}
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        {loading ? <CircularProgress /> : null}
        {error !== "" ? (
          <Typography color="secondary">{error}</Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default RuleForm;
