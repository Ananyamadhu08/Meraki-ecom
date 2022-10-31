/* eslint-disable no-alert */
import { Grid } from "@material-ui/core";
import axios from "axios";
import { useStore } from "../context";

import { Layout, ProductCard } from "../components";
import { Product } from "../models";
import { db } from "../utils";

export default function Home({ products }) {
  const { state, dispatch } = useStore();

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div>
      <Layout>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item md={3} key={product.name}>
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

  const products = await Product.find({}).lean();

  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
