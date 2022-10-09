/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import NextLink from "next/link";
import { useStyles } from "../utils";

function LoginPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      alert("succss login");
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form className={classes.login_form} onSubmit={submitHandler}>
        <Typography
          component="h1"
          variant="h1"
          className={classes.login_heading}
        >
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </div>
  );
}

export default LoginPage;
