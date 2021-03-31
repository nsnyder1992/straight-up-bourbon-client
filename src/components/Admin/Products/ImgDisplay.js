import { CardMedia, ButtonBase, Paper } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

//css
import "./styles/ImgDisplay.css";

const ImgDisplay = ({ fileUrl, fileUpload, addImage }) => {
  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);

    addImage(url);
  };

  //displays img where src ==> props.fileUrl
  return (
    <ButtonBase variant="contained" color="default" component="label">
      <Paper elevation={3} className="paper">
        {fileUrl ? (
          <CardMedia component="img" src={fileUrl} />
        ) : (
          // inline-styles needed here

          <ImageOutlinedIcon style={{ fontSize: 100 }} />
        )}
        <input
          type="file"
          hidden
          inputRef={fileUpload}
          onChange={handleFileUpload}
          id="file-upload"
        />
      </Paper>
    </ButtonBase>
  );
};

export default ImgDisplay;
