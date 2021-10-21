import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import HomeScreenLoader from "../components/HomeScreenLoader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import TopProducts from "../components/TopProducts";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  latestProductTitle: {
    margin: "0 0 2px 0",
    display: "inline",
    borderBottom: " 3px solid #0c24f7",
  },
}));

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { error, loading, products } = productList;
  let q = history.location.search;

  useEffect(() => {
    dispatch(listProducts(q));
  }, [dispatch, q]);

  const classes = useStyles();

  const data = [0, 1, 2, 3, 4, 5, 6, 7];

  document.title = "SK ONLINE STORE";

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={4}>
        {!q && (
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "10px" }}>
            <TopProducts />
          </Grid>
        )}
        {!q && products.length !== 0 && (
          <Grid item xs={12} sm={12} md={12} style={{ marginLeft: "0px" }}>
            <Typography
              variant="h3"
              gutterBottom
              className={classes.latestProductTitle}
            >
              Latest Products
            </Typography>
          </Grid>
        )}

        {loading ? (
          data.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <HomeScreenLoader item={item} />
            </Grid>
          ))
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : products.length === 0 ? (
          <Typography variant="h5" gutterBottom className={classes.title}>
            We Could not find any matches for
            <strong>" {q.split("=")[1]} "</strong>
          </Typography>
        ) : (
          products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={3}>
              <Product product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default HomeScreen;
