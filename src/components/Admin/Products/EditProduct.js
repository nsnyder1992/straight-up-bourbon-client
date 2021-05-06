import { useRef, useState, useContext, useEffect } from "react";

//material components
import {
  Button,
  Grid,
  TextField,
  Divider,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//components
import DescriptionPoint from "./DescriptionPoint";
import Stock from "./Stock";
import ImgDisplay from "./ImgDisplay";

//context
import { TokenContext } from "../../../helpers/context/token-context";
import { ProductContext } from "../../../helpers/context/product-context";

//styles
import "./styles/AddProduct.css";

//get helpers
import APIURL from "../../../helpers/environment";
import { uploadImg } from "../../../helpers/functions/cloudinary";

const EditProduct = ({ product, setReload }) => {
  //context
  const { sessionToken, setAdminView } = useContext(TokenContext);
  const { updateProduct } = useContext(ProductContext);
  //refs
  const fileUpload = useRef(null);

  //loading
  const [loading, setLoading] = useState(false);

  //states
  const [descriptionPoints, setDescriptionPoints] = useState([]);
  //   const [descriptionPointIds, setDescriptionPointIds] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [fileUrl, setFileUrl] = useState(product?.photoUrl);

  //field states
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [color, setColor] = useState(product.color);
  const [description, setDescription] = useState(product.description_main);
  const [cost, setCost] = useState((product.cost / 100).toFixed(2));
  const [error, setError] = useState("");

  //cloudinary
  const signatureUrl = `${APIURL}/cloudinary`;
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";

  //submit product
  const handleSubmit = async () => {
    const file = fileUpload.current.files[0];

    //error handling/feedback to user
    if (name === "") return setError("Add Name before submitting");
    if (type === "") return setError("Add Type before submitting");
    if (cost === "") return setError("Add Cost before submitting");
    console.log(sizes);
    if (sizes.length === 0 || sizes[0] === "")
      return setError("Need at least one size before submitting");

    setError("");

    setLoading(true);

    try {
      let body = {
        name: name,
        type: type,
        color: color,
        description_main: description,
        cost: cost,
        stripeProductId: 1,
        photoUrl: product.photoUrl,
        stock: {},
        description_points: {},
      };

      if (file !== undefined) {
        const cloudinaryJson = await uploadImg(
          signatureUrl,
          cloudinaryUrl,
          file,
          sessionToken
        );

        body.photoUrl = cloudinaryJson.url;
      }

      for (let index in sizes) {
        if (sizes[index] !== null && sizes[index] !== "") {
          console.log(sizes[index].toLowerCase(), stocks[index]);
          body.stock[sizes[index].toLowerCase()] = stocks[index];
        }
      }

      descriptionPoints.reverse();
      for (let description of descriptionPoints) {
        if (description[1] !== null && description[1] !== "") {
          body.description_points[description[0]] = description[1];
        }
      }
      descriptionPoints.reverse();

      //post to backend
      await fetch(`${APIURL}/product/${product.id}`, {
        method: "Put",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          authorization: sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          updateProduct(json.product);
          setReload(true);
          setAdminView(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  //add and image to product
  const addImage = (image) => {
    setFileUrl(image);
  };

  //add a stock size and qty to product
  const addStock = () => {
    let tempArray1 = [...stocks, 0];
    let tempArray2 = [...sizes, ""];
    setStocks(tempArray1);
    setSizes(tempArray2);
  };

  //on input field change update corresponding stock
  const updateStocks = (stock, index) => {
    let tempArray = [...stocks];
    tempArray[index] = stock;
    setStocks(tempArray);
  };

  //on input field change update corresponding size
  const updateSizes = (size, index) => {
    let tempArray = [...sizes];
    tempArray[index] = size;
    setSizes(tempArray);
  };

  //remove corresponding point
  const removeStock = (e, index) => {
    e.preventDefault();
    let tempArray1 = [...stocks];
    let tempArray2 = [...sizes];
    tempArray1.splice(index, 1);
    tempArray2.splice(index, 1);
    setStocks(tempArray1);
    setSizes(tempArray2);
  };

  //add a description point to product
  const addDescriptionPoint = () => {
    let date = Date.now();
    let tempArray = [...descriptionPoints, [date, ""]];
    setDescriptionPoints(tempArray);
  };

  //on input field change update corresponding point
  const updatePoints = (point, id, index) => {
    let tempArray = [...descriptionPoints];
    tempArray[index] = [id, point];
    setDescriptionPoints(tempArray);
  };

  //remove corresponding point
  const removeDescriptionPoint = (e, index) => {
    e.preventDefault();
    let tempArray = [...descriptionPoints];
    tempArray.splice(index, 1);
    setDescriptionPoints(tempArray);
  };

  useEffect(() => {
    let tempArray1 = [];
    let tempArray2 = [];
    for (let size of product.stock.bySize) {
      tempArray1.push(size.size);
      tempArray2.push(size.numItems);
    }

    setSizes(tempArray1);
    setStocks(tempArray2);

    tempArray1 = [];
    for (let desc of product.description.points) {
      tempArray1.push([desc.id, desc.description]);
    }

    setDescriptionPoints(tempArray1);
  }, [product]);

  return (
    <div>
      <Divider style={{ margin: 15 }} />
      <div className="admin">
        <ImgDisplay
          fileUrl={fileUrl}
          addImage={addImage}
          fileUpload={fileUpload}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-name-input"
              label="Product Name"
              className="input-field"
              type="name"
              autoComplete="current-name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-type-input"
              label="Product Type"
              className="input-field"
              type="type"
              autoComplete="current-type"
              variant="outlined"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              required
              id="outlined-color-input"
              label="Color"
              className="input-field"
              autoComplete="current-color"
              variant="outlined"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              id="outlined-number"
              label="Cost"
              type="number"
              className="input-field"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              id="outlined-description-input"
              label="Description"
              className="input-field"
              type="description"
              autoComplete="current-description"
              variant="outlined"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Grid>
          {sizes?.map((size, key) => {
            return (
              <Stock
                key={key}
                index={key}
                size={size}
                updateSizes={updateSizes}
                stock={stocks[key]}
                updateStocks={updateStocks}
                removeStock={removeStock}
              />
            );
          })}
          <Grid item xs={12}>
            <Button onClick={addStock} startIcon={<AddIcon />}>
              Stock Size
            </Button>
          </Grid>

          {descriptionPoints?.map((point, key) => {
            return (
              <DescriptionPoint
                key={key}
                point={point}
                index={key}
                updatePoints={updatePoints}
                removeDescriptionPoint={removeDescriptionPoint}
              />
            );
          })}
          <Grid item xs={12}>
            <Button onClick={addDescriptionPoint} startIcon={<AddIcon />}>
              Description
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Edit Product"}
            </Button>
          </Grid>

          <Grid item xs={12}>
            {error !== "" ? (
              <Typography color="secondary">{error}</Typography>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditProduct;
