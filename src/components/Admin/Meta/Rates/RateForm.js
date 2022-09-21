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

import CarrierCode from "../../CarrierCode";
import CarrierService from "../../CarrierService";
import RuleForm from "./RuleForm";
import useRules from "../../../../helpers/hooks/meta/rates/useRules";

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

const RateForm = ({
  submitName,
  handleSubmit,
  deleteName,
  handleDelete,
  isEdit = false,
  rate,
  loading,
  error,
  children,
}) => {
  const classes = useStyles();

  const rulesState = useRules(isEdit, rate.rules);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="name-input"
          label="Name"
          className="input-field"
          type="name"
          autoComplete="current-name"
          variant="outlined"
          onChange={(e) => rate?.setName(e.target.value)}
          value={rate?.name}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          multiline
          id="value-input"
          label="Rate Value"
          className="input-field"
          type="value"
          autoComplete="current-value"
          variant="outlined"
          onChange={(e) => rate?.setRate(e.target.value)}
          value={rate?.rate}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required={rate?.type == "shipping_rate"}
          multiline
          id="icon-input"
          label="Min Days"
          className="input-field"
          type="number"
          autoComplete="current-icon"
          variant="outlined"
          onChange={(e) => rate?.setMinDays(e.target.value)}
          value={rate?.minDays}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required={rate?.type == "shipping_rate"}
          multiline
          id="icon-input"
          label="Max Days"
          className="input-field"
          type="icon"
          autoComplete="current-icon"
          variant="outlined"
          onChange={(e) => rate?.setMaxDays(e.target.value)}
          value={rate?.maxDays}
        />
      </Grid>
      <Grid item xs={4}>
        <CarrierCode
          required={rate?.type == "shipping_rate"}
          type={rate?.carrierCode}
          handleChange={(e) => rate?.setCarrierCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <CarrierService
          required={rate?.type == "shipping_rate"}
          type={rate?.carrierService}
          handleChange={(e) => rate?.setCarrierService(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Rate Type
          </InputLabel>
          <Select
            native
            value={rate?.type}
            onChange={(e) => rate?.setType(e.target.value)}
            label="Rate Type"
            inputProps={{
              name: "type",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={null}></option>
            <option value={"shipping_rate"}>Shipping Rate</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {rulesState?.types?.map((type, index) => {
          return (
            <RuleForm
              key={index}
              rate={rate}
              rules={rulesState}
              index={index}
              submitName={"Rule"}
              handleSubmit={rulesState.addRule}
              deleteName={"Rule"}
              handleDelete={(e) => rulesState.removeRule(e, index)}
              loading={loading}
              error={error}
            />
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup spacing={2}>
          {handleDelete ? (
            <Button
              style={{ minWidth: 175 }}
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(rate.id)}
              disabled={loading}
            >
              {deleteName}
            </Button>
          ) : null}
          <Button
            style={{ minWidth: 175 }}
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(rulesState)}
            disabled={loading}
          >
            {submitName}
          </Button>
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

export default RateForm;
