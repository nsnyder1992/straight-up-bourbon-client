//material ui components
import { ListItem, Typography, ListItemText, Grid } from "@material-ui/core";

//components
import ProductQuantity from "./ProductQuantity";

const ShoppingCartItem = ({ product, addToCart, removeFromCart, key }) => {
  return (
    <ListItem>
      <img
        width={75}
        style={{ margin: 10 }}
        src={product.product.photoUrl}
        alt="product-image"
      />

      <ListItemText>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="body1">{product.product.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">{product.product.size}</Typography>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <div className="quantity-cost">
          <ProductQuantity
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            index={key}
          />
        </div>
      </ListItemText>
    </ListItem>
  );
};

export default ShoppingCartItem;
