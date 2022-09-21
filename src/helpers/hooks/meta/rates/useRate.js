import { useEffect, useState } from "react";

export default function useRate(isEdit, rateInit) {
  //rate states
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [rate, setRate] = useState();
  const [carrierCode, setCarrierCode] = useState();
  const [carrierService, setCarrierService] = useState();
  const [minDays, setMinDays] = useState();
  const [maxDays, setMaxDays] = useState();
  const [type, setType] = useState();
  const [rules, setRules] = useState();

  useEffect(() => {
    if (isEdit) {
      setId(rateInit.id);
      setName(rateInit.name);
      setRate(rateInit.rate);
      setCarrierCode(rateInit.carrierCode);
      setCarrierService(rateInit.carrierService);
      setType(rateInit.type);
      setMinDays(rateInit.minDays);
      setMaxDays(rateInit.maxDays);
      setRules(rateInit["rate-rules"]);
    }
  }, [isEdit, rateInit]);

  return {
    id,
    name,
    setName,
    rate,
    setRate,
    carrierCode,
    setCarrierCode,
    carrierService,
    setCarrierService,
    type,
    setType,
    minDays,
    setMinDays,
    maxDays,
    setMaxDays,
    rules,
    setRules,
  };
}
