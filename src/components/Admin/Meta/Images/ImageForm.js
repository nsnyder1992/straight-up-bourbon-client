import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ImgDisplay from "../../Products/ImgDisplay";

const ImageForm = ({
  submitName,
  handleSubmit,
  deleteName,
  handleDelete,
  fileUpload,
  isEdit = false,
  image,
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
          fileUrl={image.fileUrl}
          addImage={image.addImage}
          fileUpload={fileUpload}
        />
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup spacing={2}>
          {handleDelete ? (
            <Button
              style={{ minWidth: 175 }}
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(image.id)}
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

export default ImageForm;
