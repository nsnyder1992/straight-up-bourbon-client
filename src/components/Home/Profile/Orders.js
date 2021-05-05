import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";

//material ui components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  CircularProgress,
  TablePagination,
  Button,
  Typography,
} from "@material-ui/core";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//helpers
import APIURL from "../../../helpers/environment";

//styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Orders = () => {
  const classes = useStyles();

  //history
  const history = useHistory();

  //context
  const { sessionToken } = useContext(TokenContext);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState([]);

  //states
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //handlers
  const handleCancel = (e, isFulfilled, id) => {
    e.preventDefault();

    setLoading(true);
    fetch(`${APIURL}/order/cancel/${id}`, {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        fetchData();
      })
      .catch(() => null);
    setLoading(false);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    history.push(`/order/${id}`);
  };

  const handleChangePage = (e, newPage) => {
    if (newPage > page - 1) setPage(page + 1);
    if (newPage < page - 1) setPage(page - 1);
  };

  const handleChangeRowsPerPage = async (e) => {
    await setLimit(e.target.value);
  };

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/customer/order/${page}/${limit}`, {
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.auth) {
          console.log(json);
          setOrders(json.orders);
          setTotal(json.count);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionToken, limit, page]);

  return (
    <div className="content-home">
      <div className="videos">
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Tracking Number</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                  <TableCell align="right">Date Modified</TableCell>
                  <TableCell align="right">Cancel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders ? (
                  orders?.map((order, index) => {
                    let status;
                    switch (true) {
                      case order.order.isCanceled:
                        status = "Canceled";
                        break;
                      case order.order.isComplete:
                        status = "Complete";
                        break;
                      case order.order.isShipped:
                        status = "Shipped";
                        break;
                      case order.order.isFulfilled:
                        status = "Fulfilled";
                        break;
                      default:
                        status = "Waiting to be Fulfilled";
                    }
                    return (
                      <TableRow hover key={order.order.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={(event) =>
                            handleClick(event, order.order.id)
                          }
                        >
                          {order.order.id}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) =>
                            handleClick(event, order.order.id)
                          }
                        >
                          {status}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) =>
                            handleClick(event, order.order.id)
                          }
                        >
                          {order.order.trackingNumber
                            ? order.order.trackingNumber
                            : "None given yet"}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) =>
                            handleClick(event, order.order.id)
                          }
                        >
                          {moment(order.order.createdAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={(event) =>
                            handleClick(event, order.order.id)
                          }
                        >
                          {moment(order.order.updatedAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            disabled={
                              order.order.isCanceled ||
                              order.order.isShipped ||
                              order.order.isComplete
                            }
                            onClick={(e) =>
                              handleCancel(
                                e,
                                order.order.isFulfilled,
                                order.order.id
                              )
                            }
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <Typography>Your orders will appear here</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          {loading ? <CircularProgress /> : null}
        </div>
      </div>
    </div>
  );
};

export default Orders;
