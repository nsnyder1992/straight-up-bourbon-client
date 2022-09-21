import { useContext, useState } from "react";
import { TokenContext } from "../../../../helpers/context/token-context";
import APIURL from "../../../../helpers/environment";
import useRate from "../../../../helpers/hooks/meta/rates/useRate";
import RateForm from "./RateForm";

const AddRate = ({ fetchData }) => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const rate = useRate(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addRate = (rulesState) => {
    const rules = [];

    for (let i in rulesState.types) {
      rules.push({
        type: rulesState.types[i],
        variable: rulesState.variables[i],
        rule: rulesState.rFunctions[i],
        value: rulesState.values[i],
      });
    }

    const body = { rate, rules };

    setLoading(true);
    fetch(`${APIURL}/rate/`, {
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
      <RateForm
        rate={rate}
        submitName={"Add Rate"}
        handleSubmit={addRate}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default AddRate;
