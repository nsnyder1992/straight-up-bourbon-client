import { useEffect, useState } from "react";

export default function useRules(isEdit, rules) {
  //rate states
  const [ids, setIds] = useState([""]);
  const [types, setTypes] = useState(["start"]);
  const [variables, setVariables] = useState([""]);
  const [rFunctions, setRFunctions] = useState([""]);
  const [values, setValues] = useState([""]);

  const addRule = () => {
    let tempIds = [...ids, ""];
    let tempTypes = [...types, ""];
    let tempVariables = [...variables, ""];
    let tempRFunction = [...rFunctions, ""];
    let tempValues = [...values, ""];

    setIds(tempIds);
    setTypes(tempTypes);
    setVariables(tempVariables);
    setRFunctions(tempRFunction);
    setValues(tempValues);
  };

  //on input field change update corresponding stock
  const updateTypes = (type, index) => {
    let tempArray = [...types];
    tempArray[index] = type;
    setTypes(tempArray);
  };

  //on input field change update corresponding weight
  const updateVariables = (variable, index) => {
    let tempArray = [...variables];
    tempArray[index] = variable;
    setVariables(tempArray);
  };

  //on input field change update corresponding size
  const updateFunctions = (rFunction, index) => {
    let tempArray = [...rFunctions];
    tempArray[index] = rFunction;
    setRFunctions(tempArray);
  };

  //on input field change update corresponding size
  const updateValues = (value, index) => {
    let tempArray = [...values];
    tempArray[index] = value;
    setValues(tempArray);
  };

  //remove corresponding point
  const removeRule = (e, index) => {
    e.preventDefault();

    let tempArray1 = [...types];
    let tempArray2 = [...variables];
    let tempArray3 = [...rFunctions];
    let tempArray4 = [...values];
    let tempArray5 = [...ids];

    tempArray1.splice(index, 1);
    tempArray2.splice(index, 1);
    tempArray3.splice(index, 1);
    tempArray4.splice(index, 1);
    tempArray5.splice(index, 1);

    setTypes(tempArray1);
    setVariables(tempArray2);
    setRFunctions(tempArray3);
    setValues(tempArray4);
    setIds(tempArray5);
  };

  useEffect(() => {
    if (isEdit) {
      let tempIds = [];
      let tempTypes = [];
      let tempVariables = [];
      let tempRFunction = [];
      let tempValues = [];
      if (rules)
        for (let rule of rules) {
          tempIds.push(rule?.id);
          tempTypes.push(rule?.type);
          tempVariables.push(rule?.variable);
          tempRFunction.push(rule?.function);
          tempValues.push(rule?.value);
        }
      setIds(tempIds);
      setTypes(tempTypes);
      setVariables(tempVariables);
      setRFunctions(tempRFunction);
      setValues(tempValues);
    }
  }, [isEdit, rules]);

  return {
    ids,
    types,
    updateTypes,
    variables,
    updateVariables,
    rFunctions,
    updateFunctions,
    values,
    updateValues,
    addRule,
    removeRule,
  };
}
