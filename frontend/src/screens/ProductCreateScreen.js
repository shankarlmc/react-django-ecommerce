import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

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

function ProductCreateScreen({ history }) {
  const [state, setState] = useState({ errors: {} });

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = productCreate;

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Product name should not be empty.";
    }
    if (!price) {
      formIsValid = false;
      errors["price"] = "Product price should not be empty.";
    }
    if (typeof price !== "undefined") {
      if (!price.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["price"] = "Product price should be in number format.";
      }
    }
    if (!countInStock) {
      formIsValid = false;
      errors["countInStock"] = "Number of stocks should not be empty.";
    }
    if (typeof countInStock !== "undefined") {
      if (!countInStock.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["countInStock"] = "Product stock should be in integer format.";
      }
    }
    if (!image) {
      formIsValid = false;
      errors["image"] = "Product Image should not be empty.";
    }
    if (image !== "") {
      if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        formIsValid = false;
        errors["image"] = "Invalid Image Format.";
      }
    }
    if (!brand) {
      formIsValid = false;
      errors["brand"] = "Product brand should not be empty.";
    }
    if (!category) {
      formIsValid = false;
      errors["category"] = "Product Category should not be empty.";
    }
    if (!description) {
      formIsValid = false;
      errors["description"] = "Product Description should not be empty.";
    }
    setState({ errors: errors });
    return formIsValid;
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo) {
      history.push("/login?redirect=productlist");
    }

    if (successCreate) {
      history.push("/admin/productlist");
    }
  }, [userInfo, dispatch, history, successCreate]);

  // for file uploading
  const hiddenFileInput = React.useRef(null);

  const handleFileUploadBtnClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("countInStock", countInStock);
      formData.append("description", description);
      dispatch(createProduct(formData));
      setCreated(true);
    }
  };
  const classes = useStyles();
  document.title = "SK ONLINE STORE - Create new Product Item ";
  return loadingCreate ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid className={classes.goback} item xs={12}>
        <Link to="/admin/productlist">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ArrowBackIosIcon />}
          >
            Go Back
          </Button>
        </Link>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12} lg={8}>
          <div style={{ position: "sticky", top: "100px" }}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Create New Product
            </Typography>
            <form className={classes.form} onSubmit={handleCreateProduct}>
              {errorCreate && (
                <Alert severity="error" style={{ marginBottom: "15px" }}>
                  {errorCreate}
                </Alert>
              )}
              <TextField
                error={state.errors["name"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pname"
                label="Product Name"
                name="pname"
                autoComplete="pname"
                autoFocus
                value={name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setName(e.target.value)}
                helperText={state.errors["name"] ? state.errors["name"] : ""}
              />
              <TextField
                error={state.errors["price"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Product Price"
                name="price"
                autoComplete="price"
                value={price}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rs. </InputAdornment>
                  ),
                }}
                onChange={(e) => setPrice(e.target.value)}
                helperText={state.errors["price"] ? state.errors["price"] : ""}
              />
              <TextField
                error={state.errors["countInStock"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="stock"
                label="In Stock"
                name="stock"
                autoComplete="stock"
                value={countInStock}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setCountInStock(e.target.value)}
                helperText={
                  state.errors["countInStock"]
                    ? state.errors["countInStock"]
                    : ""
                }
              />
              <TextField
                error={state.errors["image"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="image"
                disabled
                label="Product Image"
                name="image"
                autoComplete="image"
                value={typeof image !== "undefined" ? image.name : image}
                onClick={handleFileUploadBtnClick}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={state.errors["image"] ? state.errors["image"] : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
              <TextField
                error={state.errors["brand"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="brand"
                label="Product Brand"
                name="brand"
                autoComplete="brand"
                value={brand}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setBrand(e.target.value)}
                helperText={state.errors["brand"] ? state.errors["brand"] : ""}
              />
              <TextField
                error={state.errors["category"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="category"
                label="Product Category"
                name="category"
                autoComplete="category"
                value={category}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setCategory(e.target.value)}
                helperText={
                  state.errors["category"] ? state.errors["category"] : ""
                }
              />
              <TextField
                error={state.errors["description"] ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                autoComplete="description"
                value={description}
                multiline
                rows={7}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDescription(e.target.value)}
                helperText={
                  state.errors["description"] ? state.errors["description"] : ""
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleCreateProduct}
                disabled={created}
              >
                {created ? "Creating....." : "Create New Product"}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCreateScreen;
