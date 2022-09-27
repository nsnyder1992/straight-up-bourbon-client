import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

//context
import APIURL from "../helpers/environment";

const MetaSection = ({ sectionId, children }) => {
  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //meta states
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [link, setLink] = useState();
  const [disable, setDisable] = useState(false);

  const getMetas = () => {
    setLoading(true);
    fetch(`${APIURL}/meta/by/path/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        path: sectionId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        for (let meta of json) {
          switch (meta.type) {
            case "title":
              setTitle(meta.message);
              break;
            case "page":
              setDescription(meta.message);
              break;
            case "image":
              setImage(meta.message);
              break;
            case "page_link":
              setLink(meta.message);
              break;
            case "disable":
              setDisable(meta.message);
              break;
          }
        }
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
    setImage(null);
    setError(null);
  };

  useEffect(() => {
    clearMetas();
    getMetas();
  }, [sectionId]);

  return (
    <div id={sectionId}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin={0}
      >
        {disable ? (
          <></>
        ) : (
          <>
            {image ? (
              <div className="background-container">
                <img
                  style={{ maxWidth: 750, width: "100%" }}
                  src={image}
                  alt={sectionId + "-img"}
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
                align="left"
                paragraph
              >
                {description}
              </Typography>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
      <Box marginTop={0}>
        {children ? children(title, description, image, link) : null}
      </Box>
    </div>
  );
};

export default MetaSection;
