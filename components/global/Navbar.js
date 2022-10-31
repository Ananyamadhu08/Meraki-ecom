/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Button,
  Menu,
  MenuItem,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import axios from "axios";
import { getError, useStyles } from "../../utils";
import { useStore } from "../../context";

export default function NavBar() {
  const classes = useStyles();
  const router = useRouter();

  const { state, dispatch } = useStore();
  const { darkMode, cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const darkModeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar className={classes.toolbar}>
        <Box>
          <Container className={classes.brand_container}>
            <Box className={classes.nav_menu_icon}>
              <i className="fa-solid fa-bars" onClick={sidebarOpenHandler} />
            </Box>
            <NextLink href="/" passHref>
              <Typography className={classes.brand}>Meraki</Typography>
            </NextLink>
          </Container>

          <Drawer
            anchor="left"
            open={sidebarVisible}
            onClose={sidebarCloseHandler}
          >
            <List>
              <ListItem>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Shop by category</Typography>

                  <Box className={classes.nav_menu_close_icon}>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={sidebarCloseHandler}
                    />
                  </Box>
                </Box>
              </ListItem>
              <Divider light />
              {categories.map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem button component="a" onClick={sidebarCloseHandler}>
                    <ListItemText primary={category} />
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Drawer>
        </Box>
        <div className={classes.searchSection}>
          <form onSubmit={submitHandler} className={classes.searchForm}>
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </IconButton>
            <InputBase
              name="query"
              className={classes.searchInput}
              placeholder="Search products"
              onChange={queryChangeHandler}
            />
          </form>
        </div>
        <div className={classes.nav_link_container}>
          <Box
            onClick={darkModeHandler}
            className={classes.nav_dark_mode_icons}
          >
            {Cookies.get("darkMode") !== "ON" ? (
              <i className="fa-solid fa-moon" />
            ) : (
              <i className="fa-solid fa-sun" />
            )}
          </Box>

          <NextLink href="/cart" passHref>
            {cart.cartItems.length > 0 ? (
              <Badge color="secondary" badgeContent={cart.cartItems.length}>
                <a className={classes.nav_link}>
                  <i className="fa-solid fa-cart-shopping" />
                </a>
              </Badge>
            ) : (
              <a className={classes.nav_link}>
                <i className="fa-solid fa-cart-shopping" />
              </a>
            )}
          </NextLink>
          {userInfo ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={loginClickHandler}
                className={classes.nav_button}
              >
                {userInfo.name}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}
              >
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
                  Profile
                </MenuItem>
                {userInfo.isAdmin ? (
                  <MenuItem
                    onClick={(e) =>
                      loginMenuCloseHandler(e, "/admin/dashboard")
                    }
                  >
                    Admin Dashboard
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Order History
                  </MenuItem>
                )}
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <a className={classes.nav_button}>Login</a>
            </NextLink>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
