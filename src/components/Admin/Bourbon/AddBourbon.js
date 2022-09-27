import { useContext, useRef, useState } from "react";
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";
import { uploadImg } from "../../../helpers/functions/cloudinary";
import useBourbon from "../../../helpers/hooks/bourbon/useBourbon";
import BourbonForm from "./BourbonForm";

const AddBourbon = ({ fetchData }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const bourbon = useBourbon(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //refs
  const fileUpload = useRef(null);

  //cloudinary
  const signatureUrl = `${APIURL}/cloudinary`;
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";

  const addBourbon = async () => {
    const file = fileUpload.current.files[0];

    const cloudinaryJson = await uploadImg(
      signatureUrl,
      cloudinaryUrl,
      file,
      sessionToken
    );

    const body = {
      name: bourbon.name,
      description: bourbon.description,
      aroma: bourbon.aroma,
      taste: bourbon.taste,
      photoUrl: cloudinaryJson.secure_url,
      link: bourbon.link,
      distillery: bourbon.distillery,
      year: bourbon.year,
      selection: bourbon.selection,
    };
    setLoading(true);
    fetch(`${APIURL}/bourbon/`, {
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
      <BourbonForm
        bourbon={bourbon}
        submitName={"Add Bourbon"}
        handleSubmit={addBourbon}
        loading={loading}
        error={error}
        fileUpload={fileUpload}
      />
    </>
  );
};

export default AddBourbon;
