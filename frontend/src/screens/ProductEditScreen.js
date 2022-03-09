import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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
import LinearProgress from "@material-ui/core/LinearProgress";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

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

function ProductEditScreen({ match, history }) {
  const productId = match.params.slug;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState();

  // const history = useHistory();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=productlist");
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product.slug !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [userInfo, product, productId, dispatch, history, successUpdate]);

  const classes = useStyles();
  document.title = "Update - " + name;

  // for file uploading
  const hiddenFileInput = React.useRef(null);

  const handleFileUploadBtnClick = (e) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (e) => {
    const fileUploaded = e.target.files[0];
    const formData = new FormData();
    formData.append("image", fileUploaded);
    formData.append("product_id", product._id);

    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      };
      const { data } = await axios.post(
        "/api/v0.1/products/upload/",
        formData,
        config
      );
      console.log(data);
      setImage(`/image/${fileUploaded.name}`);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return loading ? (
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
              Update Product Details
            </Typography>
            <form className={classes.form} onSubmit={handleUpdateProduct}>
              {error && (
                <Alert
                  severity="error"
                  color="error"
                  style={{ marginBottom: "15px" }}
                >
                  {error}
                </Alert>
              )}
              {errorUpdate && (
                <Alert
                  severity="error"
                  color="error"
                  style={{ marginBottom: "15px" }}
                >
                  {errorUpdate}
                </Alert>
              )}
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled
                id="image"
                label="Product Image"
                name="image"
                autoComplete="image"
                value={image}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setImage(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFileUploadBtnClick}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {uploading && progress && (
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      value={Number(progress)}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">
                      {`${progress}%`}
                    </Typography>
                  </Box>
                </Box>
              )}

              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
              />
              {loadingUpdate ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled
                >
                  Updating.....
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleUpdateProduct}
                >
                  Update Changes
                </Button>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductEditScreen;
