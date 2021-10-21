import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Review from "../components/Review";
import ProductDetailLoader from "../components/ProductDetailLoader";
import Message from "../components/Message";
import MenuItem from "@material-ui/core/MenuItem";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import "../index.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  },
  goback: {
    marginTop: "-30px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0 10px 0",
  },
  product_image: {
    borderRadius: "5px",
    minWidth: "100px",
  },
  description: {
    padding: "10px 0",
    fontWeight: "500",
    fontSize: "18px",
    letterSpacing: "1px",
  },
  addToCart: {
    marginTop: "20px",
  },
  review: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  form: {
    width: "50%",
    [theme.breakpoints.down(824)]: {
      width: "100%",
    },
  },
}));

function ProductScreen({ match }) {
  const [state, setState] = useState({ errors: {} });
  const [countCartItem, setCountCartItem] = useState(0);
  const [rating, setRating] = useState("0");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const theme = useTheme();

  // select all from localstorage

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const isItemOnCart = cartItems.find((x) => x.product === match.params.slug)
    ? true
    : false;
  const cartObj = cartItems.find((x) => x.product === match.params.slug);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // viewing the details of product
  useEffect(() => {
    if (successProductReview) {
      setRating("0");
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setMessage("Review created successfylly.");
    }
    dispatch(listProductDetails(match.params.slug));
  }, [dispatch, match, successProductReview, errorProductReview]);

  const cartItemIncHandler = (currentQty) => {
    setCountCartItem(currentQty + 1);
    dispatch(addToCart(match.params.slug, currentQty + 1));
  };

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.slug, 1));
    setCountCartItem(1);
    setItemAddedToCart(true);
  };
  const cartItemDecHandler = (currentQty) => {
    if (currentQty > 1) {
      setCountCartItem(currentQty - 1);
      dispatch(addToCart(match.params.slug, currentQty - 1));
      setItemAddedToCart(false);
    }
  };
  // console.log(isItemOnCart(Number(match.params.id)));
  if (product) {
    if (loading === false) {
      document.title = product.name;
    }
  } else {
    document.title = "Product not Found !";
  }

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (rating === "0") {
      formIsValid = false;
      errors["rating"] = "Please Select a Rating.";
    }
    if (!comment) {
      formIsValid = false;
      errors["comment"] = "Please write somthing...";
    }
    setState({ errors: errors });
    return formIsValid;
  };
  const handleCreateReview = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(createProductReview(product._id, { rating, comment }));
    }
  };
  // costume css classes
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      {itemAddedToCart && (
        <Message variant="success">{product.name} added to cart</Message>
      )}
      <Grid container spacing={4}>
        <Grid className={classes.goback} item xs={12}>
          <Link to="/">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
            >
              Go Back
            </Button>
          </Link>
        </Grid>
        {loading ? (
          <ProductDetailLoader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <React.Fragment>
            <Grid item md={6} sm={12}>
              <img
                src={product.image}
                alt={product.name}
                className={classes.product_image}
              />
            </Grid>
            <Grid item md={6}>
              <List component="nav" aria-label="">
                <Typography variant="h4" component="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Divider />
                <Typography
                  className={classes.description}
                  variant="body1"
                  component="span"
                  gutterBottom
                >
                  {product.description}
                </Typography>
                <div className={classes.rating}>
                  <Rating
                    name="half-rating"
                    defaultValue={parseFloat(product.rating)}
                    precision={0.5}
                    readOnly
                  />
                  <Box ml={2}>
                    ({product.rating ? product.rating : 0} stars of{" "}
                    {product.numReviews} reviews)
                  </Box>
                </div>
                <Typography
                  className={classes.description}
                  variant="body1"
                  component="p"
                  gutterBottom
                >
                  ( {product.countInStock > 0 ? "In Stock" : "Out Of Stock"} )
                </Typography>
                <Typography variant="h4" component="h4" gutterBottom>
                  Rs. {product.price}
                </Typography>
                <Divider />
                {isItemOnCart ? (
                  <div className={classes.addToCart}>
                    <ButtonGroup
                      orientation="horizontal"
                      color="primary"
                      aria-label="increment decrement cart items"
                    >
                      <Button
                        onClick={() => cartItemDecHandler(cartObj.qty)}
                        color="primary"
                        disabled={countCartItem === 1 || cartObj.qty === 1}
                        variant="contained"
                      >
                        <RemoveIcon />
                      </Button>
                      <Button style={{ color: "#000" }} disabled>
                        {cartObj.qty}
                      </Button>
                      <Button
                        onClick={() => cartItemIncHandler(cartObj.qty)}
                        color="primary"
                        disabled={countCartItem === product.countInStock}
                        variant="contained"
                      >
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  </div>
                ) : (
                  <Button
                    onClick={addToCartHandler}
                    className={classes.addToCart}
                    color="primary"
                    disabled={product.countInStock === 0}
                    variant="contained"
                    endIcon={<ShoppingCartIcon />}
                  >
                    Add To Cart
                  </Button>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="full width tabs example"
                >
                  <Tab label="All Reviews" {...a11yProps(0)} />
                  <Tab label="Create Review" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0} dir={theme.direction}>
                {product.reviews && product.reviews.length === 0 && (
                  <Alert
                    severity="warning"
                    color="warning"
                    style={{ marginBottom: "15px" }}
                  >
                    No Reviews are added to this product ({product.name}).
                  </Alert>
                )}
                {product.reviews && product.reviews.length !== 0 && (
                  <List className={classes.review}>
                    {product.reviews.map((review) => (
                      <Review review={review} key={review._id} />
                    ))}
                  </List>
                )}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {userInfo ? (
                  <div>
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.title}
                      style={{ margin: "10px 0" }}
                    >
                      Write a Review
                    </Typography>

                    <form
                      className={classes.form}
                      onSubmit={handleCreateReview}
                    >
                      {successProductReview && (
                        <Alert
                          severity="success"
                          style={{ marginBottom: "15px" }}
                        >
                          {message}
                        </Alert>
                      )}

                      {errorProductReview && (
                        <Alert
                          severity="error"
                          color="error"
                          style={{ marginBottom: "15px" }}
                        >
                          {errorProductReview}
                        </Alert>
                      )}
                      <TextField
                        error={state.errors["rating"] ? true : false}
                        margin="normal"
                        required
                        select
                        fullWidth
                        id="rating"
                        label="Select Rating"
                        name="rating"
                        variant="outlined"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        helperText={
                          state.errors["rating"] ? state.errors["rating"] : ""
                        }
                      >
                        <MenuItem value="0">Select Rating</MenuItem>
                        <MenuItem value="1">1 - Poor</MenuItem>
                        <MenuItem value="2">2 - Fair</MenuItem>
                        <MenuItem value="3">3 - Good</MenuItem>
                        <MenuItem value="4">4 - Very Good</MenuItem>
                        <MenuItem value="5">5 - Excellent</MenuItem>
                      </TextField>

                      <TextField
                        error={state.errors["comment"] ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="comment"
                        label="Comment"
                        name="comment"
                        autoComplete="comment"
                        value={comment}
                        multiline
                        rows={2}
                        onChange={(e) => setComment(e.target.value)}
                        helperText={
                          state.errors["comment"] ? state.errors["comment"] : ""
                        }
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCreateReview}
                        disabled={loadingProductReview}
                      >
                        Create Review
                      </Button>
                    </form>
                  </div>
                ) : (
                  <Alert
                    severity="warning"
                    color="warning"
                    style={{ marginBottom: "15px" }}
                  >
                    You have to be logged in to post any reviews.
                  </Alert>
                )}
              </TabPanel>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default ProductScreen;
