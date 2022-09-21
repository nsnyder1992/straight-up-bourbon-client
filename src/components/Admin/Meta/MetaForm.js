import React from "react";

import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MetaForm = ({
  submitName,
  handleSubmit,
  deleteName,
  handleDelete,
  id,
  path,
  setPath,
  message,
  setMessage,
  types,
  type,
  setType,
  loading,
  error,
  children,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="name-input"
          label="Meta Key"
          className="input-field"
          type="name"
          autoComplete="current-name"
          variant="outlined"
          onChange={(e) => setPath(e.target.value)}
          value={path}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          multiline
          id="icon-input"
          label="Meta Value"
          className="input-field"
          type="icon"
          autoComplete="current-icon"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Meta Type
          </InputLabel>
          <Select
            native
            value={type}
            onChange={handleChange}
            label="Meta Type"
            inputProps={{
              name: "type",
              id: "outlined-age-native-simple",
            }}
          >
            {types.map((type, index) => {
              return (
                <option key={index} value={type.value}>
                  {type.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup spacing={2}>
          {handleDelete ? (
            <Button
              style={{ minWidth: 175 }}
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(id)}
              disabled={loading}
            >
              {deleteName}
            </Button>
          ) : null}
          <Button
            style={{ minWidth: 175 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {submitName}
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid item xs={12}>
        {error !== "" ? (
          <Typography color="secondary">{error}</Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default MetaForm;
