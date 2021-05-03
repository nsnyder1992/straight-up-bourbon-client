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
      fulfilled: false,
      shipped: false,
      finished: false,
      canceled: false,
      tracking: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      fulfilled: this.props.order.isFulfilled,
      shipped: this.props.order.isShipped,
      finished: this.props.order.isComplete,
      canceled: this.props.order.isCanceled,
      tracking: this.props.order.trackingNumber,
    });
  }

  //handlers
  handleFulfilled = (checked) => {
    this.setState({
      fulfilled: checked,
    });
  };

  handleShipped = (checked) => {
    this.setState({
      shipped: checked,
    });
  };

  handleFinished = (checked) => {
    this.setState({
      finished: checked,
    });
  };

  handleCanceled = (checked) => {
    this.setState({
      canceled: checked,
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
      isFulfilled: this.state.fulfilled,
      isShipped: this.state.shipped,
      isComplete: this.state.finished,
      isCanceled: this.state.canceled,
      trackingNumber: this.state.tracking,
    };

    console.log("HANDLING SUBMIT");
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
        console.log(json);
        this.setLoading(false);
        this.props.handleUneditView();
      })
      .catch((err) => {
        console.log(err);
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
            checked={this.state.fulfilled}
            onChange={(e) => this.handleFulfilled(e.target.checked)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </TableCell>
        <TableCell align="right">
          <Checkbox
            checked={this.state.shipped}
            onChange={(e) => this.handleShipped(e.target.checked)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </TableCell>
        <TableCell align="right">
          <Checkbox
            checked={this.state.finished}
            onChange={(e) => this.handleFinished(e.target.checked)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </TableCell>
        <TableCell align="right">
          <Checkbox
            checked={this.state.canceled}
            onChange={(e) => this.handleCanceled(e.target.checked)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            value={this.state.tracking}
            onChange={(e) => this.handleTracking(e.target.value)}
          />
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
