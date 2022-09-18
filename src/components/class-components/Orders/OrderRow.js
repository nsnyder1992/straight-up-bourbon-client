import { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

//material ui components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Box, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

class OrderRow extends Component {
  //handlers
  handleClick = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/order/${id}`);
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
          </Box>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(OrderRow);
