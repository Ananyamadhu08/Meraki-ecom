import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import { useStyles } from "../utils";

export default function ProductCard({ product, addToCartHandler }) {
  const classes = useStyles();
  return (
    <Card className={classes.home_page_card}>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
            className={classes.home_page_card_img}
          />
          <CardContent className={classes.home_page__card_details}>
            <Typography>{product.name}</Typography>
            <Typography>{product.brand}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions className={classes.home_page_btn_container}>
        <Typography>Rs.{product.price}</Typography>

        <Box
          className={classes.home_page_card_btn}
          onClick={() => addToCartHandler(product)}
        >
          <i className="fa-solid fa-cart-plus" />
        </Box>
      </CardActions>
    </Card>
  );
}
