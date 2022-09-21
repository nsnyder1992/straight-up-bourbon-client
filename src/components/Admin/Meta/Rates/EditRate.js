import { useContext, useEffect, useState } from "react";
import { Divider } from "@material-ui/core";

import { TokenContext } from "../../../../helpers/context/token-context";
import APIURL from "../../../../helpers/environment";
import useRate from "../../../../helpers/hooks/meta/rates/useRate";
import RateForm from "./RateForm";

const EditRate = ({ rate, refresh }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const rateState = useRate(true, rate);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editRate = async (rulesState) => {
    const rules = [];

    for (let i in rulesState.types) {
      rules.push({
        id: rulesState.ids[i],
        type: rulesState.types[i],
        variable: rulesState.variables[i],
        function: rulesState.rFunctions[i],
        value: rulesState.values[i],
      });
    }

    const body = { ...rateState };
    body.rules = rules;

    console.log(body);

    setLoading(true);
    fetch(`${APIURL}/rate/${rate.id}`, {
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
  };

  const deleteRate = (id) => {
    setLoading(true);
    fetch(`${APIURL}/rate/${id}`, {
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
      <RateForm
        isEdit={true}
        rate={rateState}
        submitName={"Edit Rate"}
        handleSubmit={editRate}
        deleteName={"Delete Rate"}
        handleDelete={deleteRate}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default EditRate;
