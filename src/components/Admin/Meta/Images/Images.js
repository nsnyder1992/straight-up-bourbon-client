import { useContext, useEffect, useState } from "react";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

//context
import { TokenContext } from "../../../../helpers/context/token-context";

import APIURL from "../../../../helpers/environment";
import AdminProtected from "../../../AdminProtected";
import AddImage from "./AddImage";

const Images = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/image/${page}/${limit}`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        // authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setImages(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionToken, page]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleClick = (url) => navigator.clipboard.writeText(url);

  return (
    <AdminProtected>
      <Grid container justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom={10}
          style={{ maxWidth: 1000 }}
        >
          <AddImage fetchData={fetchData} />

          {/* {loading ? <CircularProgress /> : null} */}
          {error ? <Typography color="secondary">{error}</Typography> : null}
          <Divider />
          <Grid container spacing={2}>
            {images?.images?.map((image, index) => {
              return (
                <Grid key={index} item xs={3}>
                  <Paper elevation={3} className="paper">
                    <CardMedia
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(image.url)}
                      component="img"
                      src={image.url}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Pagination
            count={Math.ceil(images.length / limit)}
            page={page}
            onChange={handlePage}
          />
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default Images;
