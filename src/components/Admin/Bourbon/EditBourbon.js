import { Divider } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";
import { uploadImg } from "../../../helpers/functions/cloudinary";
import useBourbon from "../../../helpers/hooks/bourbon/useBourbon";
import BourbonForm from "./BourbonForm";

const EditBourbon = ({ bourbon, refresh }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //refs
  const fileUpload = useRef(null);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const bourbonState = useBourbon(true, bourbon);

  //cloudinary
  const signatureUrl = `${APIURL}/cloudinary`;
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";

  const editBourbon = async () => {
    try {
      const file = fileUpload.current.files[0];

      const body = {
        name: bourbon.name,
        description: bourbon.description,
        aroma: bourbon.aroma,
        taste: bourbon.taste,
        link: bourbon.link,
        distillery: bourbon.distillery,
        year: bourbon.year,
        selection: bourbon.selection,
      };

      if (file !== undefined) {
        const cloudinaryJson = await uploadImg(
          signatureUrl,
          cloudinaryUrl,
          file,
          sessionToken
        );

        body.photoUrl = cloudinaryJson.secure_url;
      }

      setLoading(true);
      fetch(`${APIURL}/bourbon/${bourbon.id}`, {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json",
          authorization: sessionToken,
        }),
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((json) => {
          refresh();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBourbon = (id) => {
    setLoading(true);
    fetch(`${APIURL}/meta/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        refresh();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <>
      <Divider style={{ margin: 15 }} />

      <BourbonForm
        isEdit={true}
        bourbon={bourbonState}
        submitName={"Edit Rate"}
        handleSubmit={editBourbon}
        deleteName={"Delete Rate"}
        handleDelete={deleteBourbon}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default EditBourbon;
