import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { listBrands, deleteBrand } from "../actions/brandActions";
import ModalForm from "../components/ModalForm";

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

function CategoryListScreen({ history }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  // eslint-disable-next-line
  const [isBrand, setIsBrand] = useState(true);
  const [value, setValue] = useState("");
  const [brandId, setBrandId] = useState();

  const isShowModal = (status, type, value, id) => {
    setType(type);
    setShowModal(status);
    setValue(value);
    setBrandId(id);
  };

  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const brandUpdate = useSelector((state) => state.brandUpdate);
  const {
    error: errorBrandUpdate,
    loading: loadingBrandUpdate,
    success: successBrandUpdate,
  } = brandUpdate;

  const brandCreate = useSelector((state) => state.brandCreate);
  const {
    error: errorBrandCreate,
    loading: loadingBrandCreate,
    success: successBrandCreate,
  } = brandCreate;

  const brandDelete = useSelector((state) => state.brandDelete);
  const {
    error: errorBrandDelete,
    loading: loadingBrandDelete,
    success: successBrandDelete,
  } = brandDelete;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listBrands());
      if (successBrandUpdate || successBrandCreate || successBrandDelete) {
        setShowModal(false);
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    successBrandCreate,
    successBrandUpdate,
    successBrandDelete,
  ]);

  const classes = useStyles();
  document.title = "Product Brands Lists";

  const deleteBrandHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this brand ?")) {
      dispatch(deleteBrand(id));
    }
  };
  const createBrandHandler = () => {
    isShowModal(true, "create");
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
              Product Brands
            </Typography>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={createBrandHandler}
            >
              Create New
            </Button>
          </div>

          {loadingBrandUpdate || loadingBrandCreate || loadingBrandDelete ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="inherit" />
            </div>
          ) : errorBrandUpdate || errorBrandCreate || errorBrandDelete ? (
            <Alert severity="error" style={{ marginBottom: "15px" }}>
              {errorBrandUpdate || errorBrandCreate || errorBrandDelete}
            </Alert>
          ) : (
            <>
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
                      <StyledTableCell>Total Products</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brands.map((brand, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell>{brand.name}</StyledTableCell>
                        <StyledTableCell>
                          {brand.products.length}
                        </StyledTableCell>

                        <StyledTableCell>
                          <IconButton
                            onClick={() =>
                              isShowModal(true, "edit", brand.name, brand._id)
                            }
                            color="primary"
                            aria-label="Edit"
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            onClick={() => deleteBrandHandler(brand._id)}
                            color="secondary"
                            aria-label="Delete"
                            disabled={brand.products.length > 0}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalForm
                showModal={showModal}
                onClose={isShowModal}
                type={type}
                value={value}
                isBrand={isBrand}
                id={brandId}
              ></ModalForm>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryListScreen;
