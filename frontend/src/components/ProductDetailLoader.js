import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function ProductDetailLoader() {
  return (
    <React.Fragment>
      <Grid item md={6} sm={12}>
        <Box>
          <Skeleton variant="rect" width="100%" height={300} />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box pt={0.5}>
          <Typography component="div" variant="h3">
            <Skeleton />
          </Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
          <Skeleton width="50%" />
          <Skeleton />
          <Typography component="div" variant="h2">
            <Skeleton width="40%" />
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default ProductDetailLoader;
