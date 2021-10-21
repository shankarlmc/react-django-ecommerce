import React, { useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "20%",
    marginRight: "-20ch",
    [theme.breakpoints.down("lg")]: {
      marginRight: "-10ch",
      width: "20%",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "-5ch",
      width: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      marginLeft: "-10ch",
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: "-15ch",
      width: "30%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    cursor: "text",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

function SearchProduct() {
  const [q, setQ] = useState("");
  let history = useHistory();

  const handleSearchKeywords = (e) => {
    e.preventDefault();
    if (q) {
      history.push(`/?q=${q}`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <form onSubmit={handleSearchKeywords}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search product....."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{
            "aria-label": "search",
            name: "q",
            value: q,
          }}
          onChange={(e) => setQ(e.target.value.replace(/\s+/g, "+"))}
        />
      </form>
    </div>
  );
}

export default SearchProduct;
