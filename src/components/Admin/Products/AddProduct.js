import { useRef, useState, useContext } from "react";

//material components
import {
  Button,
  Grid,
  TextField,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//components
import DescriptionPoint from "./DescriptionPoint";
import Stock from "./Stock";
import ImgDisplay from "./ImgDisplay";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//styles
import "./styles/AddProduct.css";

//get helpers
import APIURL from "../../../helpers/environment";
import { uploadImg } from "../../../helpers/functions/cloudinary";

const AddProduct = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //refs
  const fileUpload = useRef(null);

  //loading
  const [loading, setLoading] = useState(false);

  //states
  const [descriptionPoints, setDescriptionPoints] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [stocks, setStocks] = useState([0]);
  const [fileUrl, setFileUrl] = useState();

  //field states
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  //cloudinary
  const signatureUrl = `${APIURL}/cloudinary`;
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";

  //submit product
  const handleSubmit = async () => {
    const file = fileUpload.current.files[0];
    setLoading(true);

    try {
      const cloudinaryJson = await uploadImg(
        signatureUrl,
        cloudinaryUrl,
        file,
        sessionToken
      );

      let body = {
        name: name,
        type: type,
        color: color,
        description_main: description,
        description_points: ["100% cool", "cotton"],
        cost: cost,
        photoUrl: cloudinaryJson.url,
        stripeProductId: 1,
        stock: {},
        description_points: [],
      };

      sizes.reverse();
      stocks.reverse();
      for (let index in sizes) {
        if (sizes[index] !== null && sizes[index] !== "") {
          console.log();
          body.stock[sizes[index].toLowerCase()] = stocks[index];
        }
      }
      sizes.reverse();
      stocks.reverse();

      console.log(descriptionPoints);
      for (let description of descriptionPoints) {
        if (description !== null && description !== "") {
          body.description_points.push(description[1]);
        }
      }

      //post to backend
      await fetch(`${APIURL}/product/create`, {
        method: "Post",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          authorization: sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
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
    let tempArray = [...descriptionPoints, [Date.now(), ""]];
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
              className="address"
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
              className="address"
              type="type"
              autoComplete="current-type"
              variant="outlined"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              id="outlined-color-input"
              label="Color"
              className="address"
              autoComplete="current-color"
              variant="outlined"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="outlined-number"
              label="Cost"
              type="number"
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
              className="address"
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
              {loading ? <CircularProgress /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddProduct;
