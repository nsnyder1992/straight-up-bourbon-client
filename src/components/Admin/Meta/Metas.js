import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";

//context
import { TokenContext } from "../../../helpers/context/token-context";

import EditMeta from "./EditMeta";
import MetaForm from "./MetaForm";
import APIURL from "../../../helpers/environment";
import AdminProtected from "../../AdminProtected";

const Metas = ({ types }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [metas, setMetas] = useState([]);

  //new meta states
  const [path, setPath] = useState();
  const [message, setMessage] = useState();
  const [type, setType] = useState("title");

  const fetchData = () => {
    let values = [];
    for (let type of types) {
      values.push(type.value);
    }

    setLoading(true);
    fetch(`${APIURL}/meta/by/types/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify({
        types: values,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setMetas(json);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const addMeta = () => {
    const body = { path, message, type };
    setLoading(true);
    fetch(`${APIURL}/meta/`, {
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

  useEffect(() => {
    fetchData();
  }, [sessionToken]);

  return (
    <AdminProtected>
      <Grid container justifyContent="center">
        <Box display="flex" flexDirection="column" marginBottom={10}>
          <MetaForm
            submitName={"Add Meta"}
            handleSubmit={addMeta}
            path={path}
            setPath={setPath}
            message={message}
            setMessage={setMessage}
            types={types}
            type={type}
            setType={setType}
            loading={loading}
            error={error}
          />
          {loading ? <CircularProgress /> : null}
          {metas?.map((meta, index) => {
            return (
              <EditMeta
                key={index}
                meta={meta}
                refresh={fetchData}
                types={types}
              />
            );
          })}
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default Metas;
