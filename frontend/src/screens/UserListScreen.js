import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
  },
  goback: {
    marginTop: "-30px",
    marginBottom: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontWeight: 900,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    overflow: "hidden",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    alignItems: "center",
  },
  body: {
    fontSize: 14,
    alignItems: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const classes = useStyles();
  document.title = "User Lists";
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
      dispatch(deleteUser(id));
    }
  };
  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12} lg={12}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Users
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ) : (
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Admin</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index ? index + 1 : 1}
                      </StyledTableCell>
                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>
                        {user.isAdmin ? (
                          <Chip
                            size="small"
                            color="primary"
                            icon={<DoneIcon />}
                          />
                        ) : (
                          <Chip
                            size="small"
                            color="secondary"
                            icon={<CancelIcon />}
                          />
                        )}
                      </StyledTableCell>

                      <StyledTableCell>
                        <Link to={`/admin/user/${user._id}`}>
                          <Button variant="contained" color="primary">
                            Details
                          </Button>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        {user._id === userInfo._id ? (
                          <IconButton
                            color="primary"
                            aria-label="Edit"
                            disabled={true}
                          >
                            <EditIcon />
                          </IconButton>
                        ) : (
                          <Link to={`/admin/user/${user._id}/edit`}>
                            <IconButton color="primary" aria-label="Edit">
                              <EditIcon />
                            </IconButton>
                          </Link>
                        )}

                        <IconButton
                          disabled={user._id === userInfo._id}
                          onClick={() => deleteUserHandler(user._id)}
                          color="secondary"
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserListScreen;
