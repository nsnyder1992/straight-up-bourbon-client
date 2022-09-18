import { Component } from "react";
import moment from "moment";

//material ui components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  IconButton,
  Checkbox,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

//helpers
import APIURL from "../../../helpers/environment";

export default class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      tracking: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      status: this.props.order.status,
      tracking: this.props.order.trackingNumber,
    });
  }

  //handlers
  handleFulfilled = (status) => {
    this.setStatus({
      status: status,
    });
  };

  handleTracking = (tracking) => {
    this.setState({
      tracking: tracking,
    });
  };

  setLoading = (loading) => {
    this.setState({
      loading: loading,
    });
  };

  handleSubmitEdit = (id) => {
    const body = {
      status: this.state.status,
      trackingNumber: this.state.tracking,
    };

    this.setLoading(true);

    fetch(`${APIURL}/order/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        await this.props.fetchData(this.props.sessionToken);
        this.setLoading(false);
        this.props.handleUneditView();
      })
      .catch(() => {
        this.setLoading(false);
        this.props.handleUneditView();
      });
  };

  render() {
    return (
      <TableRow hover>
        <TableCell component="th" scope="row">
          {this.props.order.id}
        </TableCell>
        <TableCell align="right">
          <Checkbox
            checked={this.state.status}
            onChange={(e) => this.handleStatus(e.target.value)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </TableCell>
        <TableCell align="right">{this.props.order.email}</TableCell>
        <TableCell align="right">{this.props.session.payment_intent}</TableCell>
        <TableCell align="right">
          <TextField
            value={this.state.tracking}
            onChange={(e) => this.handleTracking(e.target.value)}
          />
        </TableCell>
        <TableCell align="right">
          {this.props.order.trackingEnabled ? "Yes" : "No"}
        </TableCell>
        <TableCell align="right">
          {moment(this.props.order.createdAt).format("MMM Do YY, h:mm:ss a")}
        </TableCell>
        <TableCell align="right">
          {moment(this.props.order.updatedAt).format("MMM Do YY, h:mm:ss a")}
        </TableCell>
        <TableCell>
          <Box display="flex" flexDirection="row" justifyContent="center">
            {!this.state.loading ? (
              <div>
                <IconButton>
                  <SendIcon
                    onClick={() => this.handleSubmitEdit(this.props.order.id)}
                  />
                </IconButton>
                <IconButton>
                  <CloseIcon onClick={() => this.props.handleUneditView()} />
                </IconButton>
              </div>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </TableCell>
      </TableRow>
    );
  }
}
