import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

//context
import { TokenContext } from "../../../helpers/context/token-context";

import APIURL from "../../../helpers/environment";
import AdminProtected from "../../AdminProtected";
import AddBourbon from "./AddBourbon";
import EditBourbon from "./EditBourbon";

const Bourbons = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bourbons, setBourbons] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/bourbon/${page}/${limit}`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        // authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setBourbons(json);
        setLoading(false);
      })
      .catch((err) => {
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

  return (
    <AdminProtected>
      <Grid container justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom={10}
          style={{ maxWidth: 1000 }}
        >
          <AddBourbon fetchData={fetchData} />

          {/* {loading ? <CircularProgress /> : null} */}
          {error ? <Typography color="secondary">{error}</Typography> : null}
          {bourbons?.bourbons?.map((bourbon, index) => {
            return (
              <EditBourbon key={index} bourbon={bourbon} refresh={fetchData} />
            );
          })}
          <Pagination
            count={Math.ceil(bourbons.length / limit)}
            page={page}
            onChange={handlePage}
          />
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default Bourbons;
