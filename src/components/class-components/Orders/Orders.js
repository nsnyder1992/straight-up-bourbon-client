import { Component } from "react";
import { withRouter } from "react-router-dom";

//material ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, TablePagination } from "@material-ui/core";
import EditOrder from "./EditOrder";
import OrderRow from "./OrderRow";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//helpers
import APIURL from "../../../helpers/environment";

class Orders extends Component {
  static contextType = TokenContext;

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      total: 0,
      orders: [],
      editOrder: null,
      loading: false,
      sessionToken: "",
      isAdmin: false,
    };
  }

  //lifecycle
  componentDidMount() {
    const { sessionToken, isAdmin } = this.context;
    this.setState({
      sessionToken: sessionToken,
      isAdmin: isAdmin,
    });

    this.fetchData(sessionToken);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.limit !== prevState.limit
    ) {
      this.fetchData(this.state.sessionToken);
    }
  }

  setLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  //handlers
  handleChangePage = (e, newPage) => {
    if (newPage > this.state.page - 1) {
      this.setState({
        page: this.state.page + 1,
      });
    }
    if (newPage < this.state.page - 1) {
      this.setState({
        page: this.state.page - 1,
      });
    }
  };

  handleChangeRowsPerPage = (e) => {
    this.setState({
      limit: e.target.value,
    });
  };

  handleUneditView = () => {
    this.setState({
      editOrder: null,
    });
  };

  handleEditView = (index) => {
    this.handleUneditView();
    this.setState({
      editOrder: index,
    });
  };

  fetchData = (sessionToken) => {
    this.setLoading(true);
    fetch(`${APIURL}/order/${this.state.page}/${this.state.limit}`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setLoading(false);

        //send unauthorized user to profile page
        if (json.error === "Not Authorized" || json.auth === false) {
          this.props.history.push("/profile");
          return;
        }

        if (!json.auth) {
          this.setState({
            orders: json.orders,
            total: json.count,
          });
        }
      })
      .catch(() => {
        this.setLoading(false);
      });
  };

  render() {
    if (this.state.isAdmin)
      return (
        <div className="content-home">
          <div className="videos">
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order #</TableCell>
                    <TableCell align="right">Fulfilled</TableCell>
                    <TableCell align="right">Shipped</TableCell>
                    <TableCell align="right">Completed</TableCell>
                    <TableCell align="right">Canceled</TableCell>
                    <TableCell align="right">Tracking Number</TableCell>
                    <TableCell align="right">Date Created</TableCell>
                    <TableCell align="right">Date Modified</TableCell>
                    <TableCell align="right">Admin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orders?.map((order, index) => {
                    return index === this.state.editOrder ? (
                      <EditOrder
                        order={order.order}
                        index={index}
                        sessionToken={this.state.sessionToken}
                        fetchData={this.fetchData}
                        handleUneditView={this.handleUneditView}
                      />
                    ) : (
                      <OrderRow
                        order={order.order}
                        index={index}
                        handleEditView={this.handleEditView}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={this.state.total}
              rowsPerPage={this.state.limit}
              page={this.state.page - 1}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            {this.state.loading ? <CircularProgress /> : null}
          </div>
        </div>
      );
    return null;
  }
}

export default withRouter(Orders);
