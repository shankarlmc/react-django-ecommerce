import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import HomeScreenLoader from "../components/HomeScreenLoader";
import Message from "../components/Message";
import { listCategoryDetails } from "../actions/categoryActions";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { listBrands } from "../actions/brandActions";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  latestProductTitle: {
    position: "relative",
    fontSize: "30px",
    margin: "0 0 5px 10px",
    width: "100%",
    color: "grey",
  },
  productFilter: {
    position: "sticky",
    top: "0px",
    overflow: "auto",
  },
  filteredProducts: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  products: {
    padding: "4px",
    // display: "flex",
  },
  filterButton: {
    margin: "0 0 10px 0",
  },
  filterOptions: {},
}));

function CategoryDetailsScreen({ match }) {
  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandList);
  const { loading: loadingBrands, error: errorBrands, brands } = brandList;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { error, loading, category } = categoryDetails;



  useEffect(() => {
    dispatch(listCategoryDetails(match.params.subcategory));
    dispatch(listBrands());
  }, [dispatch, match]);

  // console.log(category[0].products.length);

  // console.log(match.params.subcategory);

  const classes = useStyles();

  const data = [0, 1, 2, 3, 4, 5, 6, 7];

  document.title = "SK ONLINE STORE";

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={0}>
        {loading || loadingBrands ? (
          data.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <HomeScreenLoader item={item} />
            </Grid>
          ))
        ) : error || errorBrands ? (
          <Message variant="error">{error}</Message>
        ) : (
          <>
            <Grid item lg={12} className={classes.productFilter}>


            </Grid>
            <Grid item lg={12} className={classes.filteredProducts}>
              <Typography
                variant="h3"
                gutterBottom
                className={classes.latestProductTitle}
              >
                <strong>
                  {category.length > 0
                    ? `${category[0].products.length} `
                    : "0"}
                  Results for "{category.length > 0 ? category[0].name : ""}"
                </strong>
              </Typography>
              {category.length > 0
                ? category.map((cat) =>
                    cat.products.map((items, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        className={classes.products}
                      >
                        <Product product={items} />
                      </Grid>
                    ))
                  )
                : "ok"}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default CategoryDetailsScreen;
