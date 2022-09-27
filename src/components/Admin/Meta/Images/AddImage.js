import { useContext, useRef, useState } from "react";
import { TokenContext } from "../../../../helpers/context/token-context";
import APIURL from "../../../../helpers/environment";
import { uploadImg } from "../../../../helpers/functions/cloudinary";
import useImages from "../../../../helpers/hooks/images/useImages";
import ImageForm from "./ImageForm";

const AddImage = ({ fetchData }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const image = useImages(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //refs
  const fileUpload = useRef(null);

  //cloudinary
  const signatureUrl = `${APIURL}/cloudinary`;
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";

  const addImage = async () => {
    if (!image.fileUrl) return setError("Need to upload image");

    const file = fileUpload.current.files[0];

    const cloudinaryJson = await uploadImg(
      signatureUrl,
      cloudinaryUrl,
      file,
      sessionToken
    );

    const body = {
      url: cloudinaryJson.secure_url,
    };

    setLoading(true);
    fetch(`${APIURL}/image/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        fetchData();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <>
      <ImageForm
        image={image}
        submitName={"Add Image"}
        handleSubmit={addImage}
        loading={loading}
        error={error}
        fileUpload={fileUpload}
      />
    </>
  );
};

export default AddImage;
