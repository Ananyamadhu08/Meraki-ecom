import React from "react";
import Head from "next/head";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStyles } from "../../utils";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Meraki</title>
        <meta name="description" content="An ecommerce application" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Navbar />

      <Container className={classes.main}>{children}</Container>

      <Footer />
    </div>
  );
}