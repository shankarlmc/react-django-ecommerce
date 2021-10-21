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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  topAction: {
    marginTop: "-30px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  productImage: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    [theme.breakpoints.down(540)]: {
      width: "50px",
      height: "50px",
    },
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

function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, successDelete, userInfo]);

  const classes = useStyles();
  document.title = "Product Lists";

  var token = userInfo.token;
  var decoded = jwt_decode(token);

  console.log(decoded);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    history.push("/admin/product/create");
  };
  return loading ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : error ? (
    <React.Fragment>
      <Container className={classes.layout} maxWidth="md">
        <Grid item xs={12} sm={12} md={12}>
          <Alert style={{ marginTop: "10%" }} severity="error">
            {error}
          </Alert>
        </Grid>
      </Container>
    </React.Fragment>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12} lg={12}>
          <div className={classes.topAction}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Products
            </Typography>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={createProductHandler}
            >
              Create New
            </Button>
          </div>

          {errorDelete ? (
            <Alert severity="error" style={{ marginBottom: "15px" }}>
              {errorDelete}
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
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={product.image}
                          className={classes.productImage}
                          alt={product.name}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{product.name}</StyledTableCell>
                      <StyledTableCell>Rs. {product.price}/-</StyledTableCell>
                      <StyledTableCell>{product.category_name}</StyledTableCell>
                      <StyledTableCell>{product.brand_name}</StyledTableCell>
                      <StyledTableCell>
                        <Link to={`/product/${product.slug}`}>
                          <Button variant="contained" color="primary">
                            Details
                          </Button>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link to={`/admin/product/${product.slug}/edit`}>
                          <IconButton color="primary" aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </Link>

                        <IconButton
                          onClick={() => deleteProductHandler(product._id)}
                          color="secondary"
                          aria-label="Delete"
                          disabled={loadingDelete}
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

export default ProductListScreen;
