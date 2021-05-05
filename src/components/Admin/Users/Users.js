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
  Box,
  CircularProgress,
  IconButton,
  TablePagination,
  Checkbox,
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

const Users = () => {
  const classes = useStyles();

  const history = useHistory();

  //context
  const { sessionToken, isAdmin } = useContext(TokenContext);

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState([]);

  //states
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState();
  const [userIsAdmin, setUserIsAdmin] = useState();
  const [loading, setLoading] = useState(false);

  const handleIsAdmin = async (checked) => {
    setUserIsAdmin(checked);
  };

  const handleChangePage = (e, newPage) => {
    if (newPage > page - 1) setPage(page + 1);
    if (newPage < page - 1) setPage(page - 1);
  };

  const handleChangeRowsPerPage = async (e) => {
    await setLimit(e.target.value);
  };

  const handleEditView = (index) => {
    handleUneditView();

    setUserIsAdmin(users[index].isAdmin);
    setEditUser(index);
  };

  const handleUneditView = () => {
    setEditUser();
  };

  const handleSubmitEdit = (id) => {
    const body = {
      isAdmin: userIsAdmin,
    };

    setLoading(true);
    fetch(`${APIURL}/user/admin/${id}`, {
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
      })
      .catch(() => null);
    handleUneditView();
    setLoading(false);
  };

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/user/${page}/${limit}`, {
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        //send unauthorized user to profile page
        if (json.error === "Not Authorized" || json.auth === false) {
          history.push("/profile");
          return;
        }

        if (!json.auth) {
          setUsers(json.users);
          setTotal(json.count);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionToken, limit, page]);

  return (
    <div className="content-home">
      <div className="videos">
        {isAdmin ? (
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User #</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">isAdmin</TableCell>
                    <TableCell align="right">Date Created</TableCell>
                    <TableCell align="right">Date Modified</TableCell>
                    <TableCell align="right">Admin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, index) => {
                    return (
                      <TableRow hover key={user.id}>
                        <TableCell component="th" scope="row">
                          {user.id}
                        </TableCell>
                        <TableCell align="right">{user.firstName}</TableCell>
                        <TableCell align="right">{user.lastName}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">
                          {index === editUser ? (
                            <Checkbox
                              checked={userIsAdmin}
                              onChange={(e) => handleIsAdmin(e.target.checked)}
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          ) : user.isAdmin ? (
                            "Admin"
                          ) : (
                            "Standard User"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {moment(user.createdAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {moment(user.updatedAt).format(
                            "MMM Do YY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell>
                          {index === editUser ? (
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                            >
                              <IconButton>
                                <SendIcon
                                  onClick={() => handleSubmitEdit(user.id)}
                                />
                              </IconButton>
                              <IconButton>
                                <CloseIcon onClick={() => handleUneditView()} />
                              </IconButton>
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                            >
                              <IconButton
                                onClick={(e) => handleEditView(index)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        ) : null}
      </div>
    </div>
  );
};

export default Users;
