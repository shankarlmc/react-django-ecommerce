import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import ListIcon from "@material-ui/icons/List";
import TocIcon from "@material-ui/icons/Toc";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCartOnLogout,
  resetFavoriteOnLogout,
} from "../actions/cartActions";
import SearchProduct from "../components/SearchProduct";
import SidebarCategory from "./SidebarCategory";

const useStyles = makeStyles((theme) => ({
  grow: {
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    position: "sticky",
    top: 0,
    zIndex: 10,
    flexGrow: 1,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "80px",
    zIndex: 1,
    width: "100%",
    padding: "0 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  menuLeftSide: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "70px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  logo: {
    color: "#fff",
    justifySelf: "flex-start",
    cursor: "pointer",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    marginLeft: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  menuButton: {
    display: "none",
    marginRight: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    marginRight: "-15px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

export default function TopBar() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCartOnLogout());
    dispatch(resetFavoriteOnLogout());
    history.push("/");
    handleMenuClose();
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const wishList = useSelector((state) => state.wishList);
  const { favoriteItems } = wishList;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
    >
      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            disabled
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
      {userInfo && userInfo.isAdmin && (
        <div>
          <Link
            to="/admin/userlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="all users"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <GroupIcon />
              </IconButton>
              <p>Users</p>
            </MenuItem>
          </Link>
          <Link
            to="/admin/productlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="all products"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <ListIcon />
              </IconButton>
              <p>Products</p>
            </MenuItem>
          </Link>
          <Link
            to="/admin/categories"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="all categories"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <ListIcon />
              </IconButton>
              <p>Categories</p>
            </MenuItem>
          </Link>
          <Link
            to="/admin/brands"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="all brands"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <ListIcon />
              </IconButton>
              <p>Brands</p>
            </MenuItem>
          </Link>
          <Link
            to="/admin/orderlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="all products"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <TocIcon />
              </IconButton>
              <p>Orders</p>
            </MenuItem>
          </Link>
        </div>
      )}
      <MenuItem onClick={logoutHandler}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          disabled
        >
          <ExitToAppRoundedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}
    >
      {userInfo ? (
        <div>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                disabled
              >
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
          </Link>
          {userInfo && userInfo.isAdmin && (
            <div>
              <Link
                to="/admin/userlist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>
                  <IconButton
                    aria-label="all users"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    disabled
                  >
                    <GroupIcon />
                  </IconButton>
                  <p>Users</p>
                </MenuItem>
              </Link>
              <Link
                to="/admin/productlist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>
                  <IconButton
                    aria-label="all products"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    disabled
                  >
                    <ListIcon />
                  </IconButton>
                  <p>Products</p>
                </MenuItem>
              </Link>
              <Link
                to="/admin/categories"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>
                  <IconButton
                    aria-label="all categories"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    disabled
                  >
                    <ListIcon />
                  </IconButton>
                  <p>Categories</p>
                </MenuItem>
              </Link>
              <Link
                to="/admin/brands"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>
                  <IconButton
                    aria-label="all brands"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    disabled
                  >
                    <ListIcon />
                  </IconButton>
                  <p>Brands</p>
                </MenuItem>
              </Link>
              <Link
                to="/admin/orderlist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>
                  <IconButton
                    aria-label="all products"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    disabled
                  >
                    <TocIcon />
                  </IconButton>
                  <p>Orders</p>
                </MenuItem>
              </Link>
            </div>
          )}
          <MenuItem onClick={logoutHandler}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              disabled
            >
              <ExitToAppRoundedIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <IconButton aria-label="login" color="inherit">
              <LockOpenIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="absolute" className={classes.container}>
        <Toolbar>
          <div className={classes.menuLeftSide}>
            <Link to="/" className={classes.link}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <AppsRoundedIcon />
              </IconButton>
            </Link>
            <Link to="/" className={classes.logo}>
              <Typography className={classes.title} variant="h6" noWrap>
                SK ONLINE STORE
              </Typography>
            </Link>
            <SidebarCategory />
          </div>
          <SearchProduct />

          <div className={classes.grow} />
          <Link to="/cart" className={classes.link}>
            <IconButton aria-label="show cart items" color="inherit">
              <Badge
                badgeContent={cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/favorite-items" className={classes.link}>
            <IconButton aria-label="show cart items" color="inherit">
              <Badge
                badgeContent={favoriteItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                color="secondary"
              >
                {favoriteItems.length > 0 ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderRoundedIcon />
                )}
              </Badge>
            </IconButton>
          </Link>
          <div className={classes.sectionDesktop}>
            {userInfo ? (
              <Avatar
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="info"
              >
                <AccountCircle />
              </Avatar>
            ) : (
              <Link to="/login" className={classes.link}>
                <IconButton aria-label="login" color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
