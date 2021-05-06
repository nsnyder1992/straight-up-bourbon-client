import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

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
  Typography,
} from "@material-ui/core";

//components
// @ts-ignore
import { OrderRow } from "./OrderRow.tsx";

// @ts-ignore
import { OrderType } from "./dataStructure.tsx";

//context
import { TokenContext } from "../../helpers/context/token-context";

//helpers
import APIURL from "../../helpers/environment";

//styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function Orders(): React.ReactNode {
  const classes = useStyles();

  //context
  const { sessionToken } = useContext(TokenContext);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  //states
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //handlers
  const handleCancel = (id: number) => {
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

  const handleChangePage = (newPage: number) => {
    if (newPage > page - 1) setPage(page + 1);
    if (newPage < page - 1) setPage(page - 1);
  };

  const handleChangeRowsPerPage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await setLimit(parseInt(e.target.value));
  };

  const fetchData = async () => {
    setLoading(true);
    await fetch(`${APIURL}/customer/order/${page}/${limit}`, {
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.auth) {
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
                  orders?.map(
                    (order: OrderType, index: number): JSX.Element => {
                      let status;
                      switch (true) {
                        case order?.order.isCanceled:
                          status = "Canceled";
                          break;
                        case order?.order.isComplete:
                          status = "Complete";
                          break;
                        case order?.order.isShipped:
                          status = "Shipped";
                          break;
                        case order?.order.isFulfilled:
                          status = "Fulfilled";
                          break;
                        default:
                          status = "Waiting to be Fulfilled";
                      }

                      let disabled =
                        order?.order.isCanceled ||
                        order?.order.isShipped ||
                        order?.order.isComplete;

                      return (
                        <OrderRow
                          key={index}
                          id={order?.order.id}
                          status={status}
                          disabled={disabled}
                          trackingNumber={order?.order.trackingNumber}
                          createdAt={order?.order.createdAt}
                          updatedAt={order?.order.updatedAt}
                          handleCancel={handleCancel}
                        />
                      );
                    }
                  )
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
            onChangePage={(e, newPage) => handleChangePage(newPage)}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          {loading ? <CircularProgress /> : null}
        </div>
      </div>
    </div>
  );
}
