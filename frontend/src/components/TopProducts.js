import React, { useEffect } from "react";
import Slider from "react-animated-slider";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import "react-animated-slider/build/horizontal.css";
import "../index.css";
import { listTopRatedProducts } from "../actions/productActions";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

function TopProducts() {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;
  const history = useHistory();

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  const handleViewDetail = (slug) => {
    history.push(`/product/${slug}`);
  };

  return loading ? (
    <Grid item md={12} sm={12}>
      <Box>
        <Skeleton
          variant="rect"
          width="100%"
          height={300}
          style={{ borderRadius: "10px" }}
        />
      </Box>
    </Grid>
  ) : error ? (
    <Alert severity="error" color="error" style={{ marginBottom: "15px" }}>
      {error}
    </Alert>
  ) : products ? (
    <Slider className="slider-wrapper" autoplay={3500}>
      {products.map((product, index) => (
        <div
          key={index}
          className="slider-content"
          style={{
            background: `url('${product.image}') no-repeat center center`,
          }}
        >
          <div className="inner">
            <h1>{product.name}</h1>
            <p>{product.description.substring(0, 100)}...</p>
            <button
              className="slider-view-details-btn"
              id={product.slug}
              type="button"
              onClick={() => handleViewDetail(product.slug)}
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    ""
  );
}

export default TopProducts;
