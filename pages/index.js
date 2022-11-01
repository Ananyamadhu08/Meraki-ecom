/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { Grid, Link } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useStore } from "../context";
import { Layout, ProductCard } from "../components";
import { Product } from "../models";
import { db, useStyles } from "../utils";

export default function Home(props) {
  const { state, dispatch } = useStore();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { topRatedProducts, featuredProducts } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div>
      <Layout>
        <Carousel className={classes.carousel} animation="slide">
          {featuredProducts.map((product) => (
            <NextLink
              key={product._id}
              href={`/product/${product.slug}`}
              passHref
            >
              <Link>
                <img
                  src={product.featuredImage}
                  alt={product.name}
                  className={classes.carousel_featured_images}
                />
              </Link>
            </NextLink>
          ))}
        </Carousel>
        <Grid container spacing={3}>
          {topRatedProducts.map((product) => (
            <Grid item lg={3} key={product.name}>
              <ProductCard
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews",
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(8);

  await db.disconnect();

  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
