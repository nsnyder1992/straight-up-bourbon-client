import { useRef, useState } from "react";

//material components
import {
  IconButton,
  Button,
  Grid,
  TextField,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//components
import DescriptionPoint from "./DescriptionPoint";
import ImgDisplay from "./ImgDisplay";

//styles
import "./styles/AddProduct.css";

const AddProduct = () => {
  //refs
  const fileUpload = useRef();

  //states
  const [descriptionPoints, setDescriptionPoints] = useState([""]);
  const [fileUrl, setFileUrl] = useState();

  //field states
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  //submit product
  const addProduct = () => {
    console.log("post product");
  };

  //add and image to product
  const addImage = (image) => {
    setFileUrl(image);
  };

  //add a description point to product
  const addDescriptionPoint = () => {
    let tempArray = [...descriptionPoints, ""];
    setDescriptionPoints(tempArray);
  };

  //on input field change update corresponding point
  const updatePoints = (point, index) => {
    let tempArray = [...descriptionPoints];
    tempArray[index] = point;
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-cost-input"
              label="Cost"
              className="address"
              type="cost"
              autoComplete="current-cost"
              variant="outlined"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
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
            <IconButton onClick={addDescriptionPoint}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Button onSubmit={addProduct}>Add Product</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddProduct;
