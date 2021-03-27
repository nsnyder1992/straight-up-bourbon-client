import { useState } from "react";

//material components
import { Button, Grid, Typography } from "@material-ui/core";

//material styles
import { makeStyles } from "@material-ui/core/styles";

//components
import Address from "./Address";
import AddAddressFields from "./AddAddressFields";

//styles
import "./styles/Addresses.css";

const Addresses = ({ addresses }) => {
  const [showFields, setShowFields] = useState(false);

  const toggleFields = () => setShowFields(true);

  return (
    <div>
      {!addresses ? (
        <Typography variant="caption">
          You have not added any addresses yet
        </Typography>
      ) : (
        <Address address={"Address"} />
      )}
      <hr />

      {showFields ? (
        <AddAddressFields />
      ) : (
        <Button variant="contained" color="primary" onClick={toggleFields}>
          Add Address
        </Button>
      )}
    </div>
  );
};

export default Addresses;
