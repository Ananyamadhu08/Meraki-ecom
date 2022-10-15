/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Container,
} from "@material-ui/core";
import { useStyles } from "../../utils";
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

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <NextLink href="/" passHref>
          <a>
            <Container className={classes.brand_container}>
              <i
                className="fa-solid fa-dice-d20"
                style={{ fontSize: "1.7rem" }}
              />
              <Typography className={classes.brand}>Meraki</Typography>
            </Container>
          </a>
        </NextLink>
        <div className={classes.grow} />
        <div className={classes.nav_link_container}>
          <Switch checked={darkMode} onChange={darkModeChangeHandler} />
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
