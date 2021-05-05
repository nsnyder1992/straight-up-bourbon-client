import { IconButton, Grid, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

//Description Points
const DescriptionPoint = ({
  point,
  updatePoints,
  index,
  removeDescriptionPoint,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            multiline
            id="outlined-description-input"
            label="Description Point"
            className="input-field"
            type="description"
            autoComplete="current-description"
            variant="outlined"
            onChange={(e) => updatePoints(e.target.value, point[0], index)}
            value={point[1]}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            style={{ margin: 5 }}
            onClick={(e) => removeDescriptionPoint(e, index)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DescriptionPoint;
