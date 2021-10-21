import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import CategoryIcon from "@material-ui/icons/Category";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { listCategories } from "../actions/categoryActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 200,
    marginLeft: 20,
  },
  paper: {
    marginRight: theme.spacing(2),
    width: 200,
  },
  categoryViewBtn: {
    background: "#F0F0F0",
    width: 300,
    "&:hover": {
      background: "#efefef",
    },
  },
  dropDownCategories: {
    width: 300,
  },
  subcatContainer: {
    background: "#fff",
    marginBottom: "-20px",
    boxShadow: "0px",
    height: "100%",
  },
  listSubCat: {
    display: "flex",
    flexDirection: "column",
  },
  subcategory: {
    padding: "4px",
    width: "100%",
    cursor: "pointer",
    "&:first-child": {
      borderTop: "2px solid grey",
    },
    borderBottom: "2px solid grey",
    "&:last-child": {
      borderBottom: "0px",
    },
    "&:hover": {
      backgroundColor: "grey",
      color: "#fff",
    },
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleDetailProduct = (category, subcategory) => {
    history.push(`/${category}/${subcategory}`);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.categoryViewBtn}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          startIcon={<CategoryIcon />}
          endIcon={
            open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />
          }
        >
          Categories
        </Button>
        <Popper
          className={classes.dropDownCategories}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper
                style={{
                  backgroundColor: "transparent",
                  opacity: "1",
                  height: "auto",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: "-2px",
                    }}
                  >
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress color="inherit" />
                      </div>
                    ) : error ? (
                      <Alert severity="error" style={{ marginBottom: "15px" }}>
                        {error}
                      </Alert>
                    ) : (
                      categories.map((category, index) => (
                        <div key={index}>
                          {category.sub_categories.length > 0 && (
                            <Accordion className={classes.subcatContainer}>
                              <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <h3 style={{ fontWeight: "bold" }}>
                                  {category.name}
                                </h3>
                              </AccordionSummary>
                              <AccordionDetails className={classes.listSubCat}>
                                {category.sub_categories.map(
                                  (subcat, subId) => (
                                    <List
                                      key={subId}
                                      component="li"
                                      disablePadding
                                      className={classes.subcategory}
                                      onClick={() =>
                                        handleDetailProduct(
                                          category.slug,
                                          subcat.slug
                                        )
                                      }
                                    >
                                      <ListItemText primary={subcat.name} />
                                    </List>
                                  )
                                )}
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </div>
                      ))
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
