import { IconButton, Grid, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

//Description Points
const Stock = ({
  size,
  updateSizes,
  stock,
  updateStocks,
  index,
  removeStock,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <TextField
            multiline
            id="outlined-size-input"
            label="Size"
            className="address"
            type="text"
            autoComplete="current-description"
            variant="outlined"
            onChange={(e) => updateSizes(e.target.value, index)}
            value={size}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
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
