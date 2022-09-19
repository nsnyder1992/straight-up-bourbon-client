import { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

//material ui components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Box, CircularProgress, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import APIURL from "../../../helpers/environment";

class OrderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  //handlers
  handleClick = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/order/${id}`);
  };

  setLoading = (loading) => {
    this.setState({
      loading: loading,
    });
  };

  createLabel = (e, id) => {
    if (!this.props.order.weight || this.props.order.weight < 0)
      return this.props.setError("Weight Must be greater than 0");

    this.setLoading(true);
    console.log(id);

    fetch(`${APIURL}/order/create/label/${id}`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        console.log(json);
        await this.props.fetchData(this.props.sessionToken);
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
      });
  };

  trackPackage = (e, id) => {
    this.setLoading(true);
    console.log(id);

    fetch(`${APIURL}/order/enable/tracking/${id}`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        console.log(json);
        await this.props.fetchData(this.props.sessionToken);
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
      });
  };

  render() {
    return (
      <TableRow hover key={this.props.order.id}>
        <TableCell
          component="th"
          scope="row"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.id}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.status}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.email}
        </TableCell>
        <TableCell align="right">{this.props.session.payment_intent}</TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.weight}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.carrierCode}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.trackingNumber
            ? this.props.order.trackingNumber
            : "None given yet"}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {this.props.order.trackingEnabled ? "Yes" : "No"}
        </TableCell>
        <TableCell
          align="right"
          onClick={(event) => this.handleClick(event, this.props.order.id)}
        >
          {moment(this.props.order.createdAt).format("MMM Do YY, h:mm:ss a")}
        </TableCell>
        <TableCell>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <IconButton
              onClick={(e) => this.props.handleEditView(this.props.index)}
            >
              <EditIcon />
            </IconButton>
            {this.props.order.shipmentId ? (
              <></>
            ) : (
              <IconButton
                onClick={(e) => this.createLabel(e, this.props.order.id)}
              >
                {this.state.loading ? <CircularProgress /> : <LabelIcon />}
              </IconButton>
            )}
            {this.props.order.trackingEnabled ? (
              <></>
            ) : (
              <IconButton
                onClick={(e) => this.trackPackage(e, this.props.order.id)}
              >
                {this.state.loading ? (
                  <CircularProgress />
                ) : (
                  <TrackChangesIcon />
                )}
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(OrderRow);
