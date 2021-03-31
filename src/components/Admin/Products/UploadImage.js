import { IconButton } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const UploadImage = ({ addImage, fileUpload }) => {
  //on change of input get file and create a URL and set fileURL
  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);

    addImage(url);
  };

  const styles = {
    icon: {
      fontSize: 30,
    },
  };

  return (
    <div>
      {/* input is hidden in a button */}
      <IconButton variant="contained" color="default" component="label">
        <ImageOutlinedIcon style={styles.icon} />
        <input
          type="file"
          hidden
          ref={fileUpload}
          onChange={handleFileUpload}
          id="file-upload"
        />
      </IconButton>
    </div>
  );
};

export default UploadImage;
