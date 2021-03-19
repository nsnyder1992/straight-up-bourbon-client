//material components
import { Typography } from "@material-ui/core";

//styles
import "./styles/ProductSize.css";

const ProductSize = ({ sizes, sizeIndex, setSizeIndex }) => {
  const handleSelect = (key) => {
    setSizeIndex(key);
  };

  return (
    <div className="sizes-container">
      <Typography variant="body2">SIZE</Typography>
      <div className="sizes">
        {sizes?.map((size, key) => {
          return (
            <div
              className={key === sizeIndex ? "selected-size" : "size"}
              onClick={(e) => handleSelect(key)}
            >
              <Typography variant="body1">
                {size[0].toUpperCase() + size.slice(1)}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSize;
