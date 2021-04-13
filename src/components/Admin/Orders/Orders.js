import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import DeleteIcon from "@material-ui/icons/Delete";
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
  Box,
  CircularProgress,
  IconButton,
  TablePagination,
  Typography,
  Checkbox,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

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
  const { sessionToken, isAdmin } = useContext(TokenContext);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState([]);

  //states
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState();
  const [fulfilled, setFulfilled] = useState();
  const [shipped, setShipped] = useState();
  const [finished, setFinished] = useState();
  const [tracking, setTracking] = useState("");
  const [loading, setLoading] = useState(false);

  //handlers
  const handleClick = (e, id) => {
    e.preventDefault();
    history.push(`/order/${id}`);
  };

  const handleFulfilled = async (checked) => {
    setFulfilled(checked);
  };

  const handleShipped = (checked) => {
    setShipped(checked);
  };

  const handleFinished = (checked) => {
    setFinished(checked);
  };

  const handleChangePage = () => {
    setPage(1);
  };

  const handleChangeRowsPerPage = async (e) => {
    await setLimit(e.target.value);
  };

  const handleEditView = (index) => {
    handleUneditView();
    setFulfilled(orders[index].order.isFulfilled);
    setShipped(orders[index].order.isShipped);
    setFinished(orders[index].order.isFinished);
    setTracking(orders[index].order.trackingNumber);
    setEditOrder(index);
  };

  const handleUneditView = () => {
    setEditOrder();
  };

  const handleSubmitEdit = (id) => {
    const body = {
      isFulfilled: fulfilled,
      isShipped: shipped,
      isComplete: finished,
      trackingNumber: tracking,
    };
    setLoading(true);
    fetch(`${APIURL}/order/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        fetchData();
        console.log(json);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/order/${page}/${limit}`, {
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
        console.log(json.orders);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(sessionToken);
    fetchData();
  }, [sessionToken]);

  return (
    <div>
      <br />
      <Typography variant="h4">ORDERS</Typography>
      {isAdmin ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell align="right">Fulfilled</TableCell>
                  <TableCell align="right">Shipped</TableCell>
                  <TableCell align="right">Completed</TableCell>
                  <TableCell align="right">Tracking Number</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                  <TableCell align="right">Date Modified</TableCell>
                  <TableCell align="right">Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index) => {
                  if (index === editOrder) {
                    return (
                      <TableRow hover key={order.order.id}>
                        <TableCell component="th" scope="row">
                          {order.order.id}
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={fulfilled}
                            onChange={(e) => handleFulfilled(e.target.checked)}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={shipped}
                            onChange={(e) => handleShipped(e.target.checked)}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={finished}
                            onChange={(e) => handleFinished(e.target.checked)}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            value={tracking}
                            onChange={(e) => setTracking(e.target.value)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {moment(order.order.createdAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {moment(order.order.updatedAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell>
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                          >
                            <IconButton>
                              <SendIcon
                                onClick={() => handleSubmitEdit(order.order.id)}
                              />
                            </IconButton>
                            <IconButton>
                              <CloseIcon onClick={() => handleUneditView()} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow hover key={order.order.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {order.order.id}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {order.order.isFulfilled ? "Yes" : "No"}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {order.order.isShipped ? "Yes" : "No"}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {order.order.isComplete ? "Yes" : "No"}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {order.order.trackingNumber
                          ? order.order.trackingNumber
                          : "None given yet"}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {moment(order.order.createdAt).format(
                          "MMM Do YY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => handleClick(event, order.order.id)}
                      >
                        {moment(order.order.updatedAt).format(
                          "MMM Do YY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <IconButton onClick={(e) => handleEditView(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          {loading ? <CircularProgress /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
