import { IconButton, Grid, TextField, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

//Description Points
const Stock = ({
  size,
  updateSizes,
  weight,
  updateWeights,
  stock,
  updateStocks,
  index,
  removeStock,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <TextField
            required
            multiline
            id="outlined-size-input"
            label="Size"
            className="input-field"
            type="text"
            autoComplete="current-description"
            variant="outlined"
            onChange={(e) => updateSizes(e.target.value, index)}
            value={size}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="outlined-number"
            label="Weight"
            type="number"
            className="input-field"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">oz</InputAdornment>,
            }}
            onChange={(e) => updateWeights(e.target.value, index)}
            value={weight}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            className="input-field"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => updateStocks(e.target.value, index)}
            value={stock}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            style={{ margin: 5 }}
            onClick={(e) => removeStock(e, index)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Stock;
