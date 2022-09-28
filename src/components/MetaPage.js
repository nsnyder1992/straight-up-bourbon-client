import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//context
import APIURL from "../helpers/environment";

import logo_background_resize from "./images/logo_background_resize.jpg";

const MetaPage = ({ children }) => {
  const location = useLocation();

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //meta states
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [textAlign, setTextAlign] = useState();
  const [image, setImage] = useState();
  const [sections, setSections] = useState([]);

  const getMetas = () => {
    setLoading(true);
    fetch(`${APIURL}/meta/by/path/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        path: location.pathname,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let tempSections = [];
        for (let meta of json) {
          switch (meta.type) {
            case "title":
              setTitle(meta.message);
              break;
            case "page":
              setDescription(meta.message);
              break;
            case "text_align":
              setTextAlign(meta.message);
              break;
            case "image":
              setImage(meta.message);
              break;
            case "section":
              tempSections.push(meta.message);
              break;
          }
        }
        setSections(tempSections);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Couldn't Load Resources from server");
      });
  };

  const clearMetas = () => {
    setTitle(null);
    setDescription(null);
    setTextAlign(null);
    setImage(null);
    setError(null);
    setSections([]);
  };

  useEffect(() => {
    clearMetas();
    getMetas();
  }, [location]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin={0}
      >
        {image ? (
          <div className="background-container">
            <img
              style={{ maxWidth: 750, width: "100%" }}
              src={image}
              alt="logo"
            />
          </div>
        ) : (
          <></>
        )}

        {title ? (
          <Box marginTop={2}>
            <Typography variant="h4">{title}</Typography>
          </Box>
        ) : (
          <></>
        )}

        {description ? (
          <Typography
            style={{ maxWidth: 750, margin: 15 }}
            variant="body1"
            component="p"
            align={textAlign ? textAlign : "left"}
            paragraph
          >
            {description}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      {children(sections)}
    </>
  );
};

export default MetaPage;
