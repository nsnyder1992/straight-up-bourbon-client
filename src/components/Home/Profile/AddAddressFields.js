import { useState } from "react";

import { Grid, TextField, Button } from "@material-ui/core";

//styles
import "./styles/AddAddressFields.css";

const AddAddressFields = () => {
  //states for adding a address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddAddress = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleAddAddress}>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <TextField
            required
            id="outlined-name1-input"
            label="First Name"
            className="address"
            type="name"
            autoComplete="current-name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="outlined-name2-input"
            label="Last Name"
            className="address"
            type="name"
            autoComplete="current-name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            required
            id="outlined-address-input"
            label="Address"
            className="address"
            type="address"
            autoComplete="current-address"
            variant="outlined"
            onChange={(e) => setStreet(e.target.value)}
            value={street}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="outlined-address2-input"
            label="Address 2"
            className="address"
            type="address"
            autoComplete="current-address"
            variant="outlined"
            onChange={(e) => setStreet2(e.target.value)}
            value={street2}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="outlined-city-input"
            label="City"
            className="address"
            type="city"
            autoComplete="current-city"
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="outlined-state-input"
            label="State"
            className="address"
            type="state"
            autoComplete="current-state"
            variant="outlined"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="outlined-zipcode-input"
            label="Zip Code"
            className="address"
            type="zipCode"
            autoComplete="current-zip-code"
            variant="outlined"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="outlined-phone-input"
            label="Phone"
            className="address"
            type="phone"
            autoComplete="current-phone"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </Grid>
        <Grid item sm={12}>
          <Button
            className="address button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Add Address
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAddressFields;
