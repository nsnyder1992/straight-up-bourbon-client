import { CircularProgress, Divider, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";
import MetaForm from "./MetaForm";

const EditMeta = ({ meta, refresh, types }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //icon states
  const [path, setPath] = useState();
  const [message, setMessage] = useState(meta.message);
  const [type, setType] = useState(meta.type);

  useEffect(() => {
    setPath(meta.path);
    setMessage(meta.message);
    setType(meta.type);
  }, [meta]);

  const editMeta = () => {
    const body = { path, message, type };

    setLoading(true);
    fetch(`${APIURL}/meta/${meta.id}`, {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setPath(json.path);
        setMessage(json.message);
        setType(json.type);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const deleteMeta = (id) => {
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

      <MetaForm
        submitName={"Edit Meta"}
        handleSubmit={editMeta}
        deleteName={"Delete Meta"}
        handleDelete={deleteMeta}
        id={meta.id}
        path={path}
        setPath={setPath}
        message={message}
        setMessage={setMessage}
        types={types}
        type={type}
        setType={setType}
        loading={loading}
        error={error}
      >
        {loading ? <CircularProgress /> : null}
        {error ? <Typography color="secondary">{error}</Typography> : null}
      </MetaForm>
    </>
  );
};

export default EditMeta;
