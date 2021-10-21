import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

function HomeScreenLoader({ item }) {
  return (
    <Box key={item}>
      <Skeleton variant="rect" width="100%" height={118} />
      <Box pt={0.5}>
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton width="60%" />
        <Skeleton />
      </Box>
    </Box>
  );
}

export default HomeScreenLoader;
