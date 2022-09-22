import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

//context
import { TokenContext } from "../../../../helpers/context/token-context";

import AddRate from "./AddRate";
import EditRate from "./EditRate";
import APIURL from "../../../../helpers/environment";
import AdminProtected from "../../../AdminProtected";

const Rates = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rates, setRates] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/rate/${page - 1}/${limit}`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        // authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setRates(json);
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
          <AddRate fetchData={fetchData} />

          {loading ? <CircularProgress /> : null}
          {error ? <Typography color="secondary">{error}</Typography> : null}
          {rates?.rates?.map((rate, index) => {
            return <EditRate key={index} rate={rate} refresh={fetchData} />;
          })}
          <Pagination
            count={Math.round(Math.round(rates?.total + 1) / limit)}
            page={page}
            onChange={handlePage}
          />
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default Rates;
