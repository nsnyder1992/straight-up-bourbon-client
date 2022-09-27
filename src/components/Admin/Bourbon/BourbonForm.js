import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ImgDisplay from "../Products/ImgDisplay";

const BourbonForm = ({
  submitName,
  handleSubmit,
  deleteName,
  handleDelete,
  fileUpload,
  isEdit = false,
  bourbon,
  loading,
  error,
  children,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <ImgDisplay
          fileUrl={bourbon.fileUrl}
          addImage={bourbon.addImage}
          fileUpload={fileUpload}
        />
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
          onChange={(e) => bourbon?.setName(e.target.value)}
          value={bourbon?.name}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          multiline
          id="description-input"
          label="Description"
          className="input-field"
          type="description"
          autoComplete="current-description"
          variant="outlined"
          onChange={(e) => bourbon?.setDescription(e.target.value)}
          value={bourbon?.description}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          multiline
          id="aroma-input"
          label="Aroma Notes"
          className="input-field"
          type="value"
          autoComplete="current-aroma"
          variant="outlined"
          onChange={(e) => bourbon?.setAroma(e.target.value)}
          value={bourbon?.aroma}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          multiline
          id="taste-input"
          label="Taste Notes"
          className="input-field"
          type="taste"
          autoComplete="current-taste"
          variant="outlined"
          onChange={(e) => bourbon?.setTaste(e.target.value)}
          value={bourbon?.taste}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          multiline
          id="link-input"
          label="Review URL"
          className="input-field"
          type="link"
          autoComplete="current-link"
          variant="outlined"
          onChange={(e) => bourbon?.setLink(e.target.value)}
          value={bourbon?.link}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          multiline
          id="distillery-input"
          label="Distillery"
          className="input-field"
          type="distillery"
          autoComplete="current-distillery"
          variant="outlined"
          onChange={(e) => bourbon?.setDistillery(e.target.value)}
          value={bourbon?.distillery}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          multiline
          id="year-input"
          label="Year"
          className="input-field"
          type="year"
          autoComplete="current-year"
          variant="outlined"
          onChange={(e) => bourbon?.setYear(e.target.value)}
          value={bourbon?.year}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          multiline
          id="selection-input"
          label="Selection"
          className="input-field"
          type="selection"
          autoComplete="current-selection"
          variant="outlined"
          onChange={(e) => bourbon?.setSelection(e.target.value)}
          value={bourbon?.selection}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup spacing={2}>
          {handleDelete ? (
            <Button
              style={{ minWidth: 175 }}
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(bourbon.id)}
              disabled={loading}
            >
              {deleteName}
            </Button>
          ) : null}
          <Button
            style={{ minWidth: 175 }}
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
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

export default BourbonForm;
