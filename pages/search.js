/* eslint-disable no-unused-expressions */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cookies from "js-cookie";
import {
  Box,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import axios from "axios";
import { Layout, ProductCard } from "../components";
import { useStore } from "../context";
import { db, useStyles } from "../utils";
import { Product } from "../models";

const PAGE_SIZE = 6;

const prices = [
  {
    name: "Rs.1000 to Rs.5000",
    value: "1000-5000",
  },
  {
    name: "Rs.5000 to Rs.10000",
    value: "5000-10000",
  },
  {
    name: "Rs.10000 to Rs.20000",
    value: "10000-20000",
  },
];

export default function Search(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    sort = "featured",
  } = router.query;
  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };

  const { state, dispatch } = useStore();
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
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List className={classes.filters_sidebar}>
            <ListItem>
              <Box className={classes.filters_sidebar_select}>
                <Typography className={classes.filters_sidebar_headings}>
                  Categories:
                </Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.filters_sidebar_select}>
                <Typography className={classes.filters_sidebar_headings}>
                  Brands:
                </Typography>
                <Select value={brand} onChange={brandHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.filters_sidebar_select}>
                <Typography className={classes.filters_sidebar_headings}>
                  Prices:
                </Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.search_result_page_header}
          >
            <Grid item>
              <Box className={classes.search_results_header}>
                {products.length === 0
                  ? "No Results Found"
                  : `${countProducts} Results`}
                {query !== "all" && query !== "" && ` : ${query}`}
                {category !== "all" && ` : ${category}`}
                {brand !== "all" && ` : ${brand}`}
                {price !== "all" && ` : Price ${price}`}
                {(query !== "all" && query !== "") ||
                category !== "all" ||
                brand !== "all" ||
                price !== "all" ? (
                  <Box onClick={() => router.push("/search")}>
                    <i className="fa-solid fa-xmark" />
                  </Box>
                ) : null}
              </Box>
            </Grid>
            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort by:
              </Typography>
              <Select
                value={sort}
                onChange={sortHandler}
                className={classes.sort_by_select}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductCard
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          {products.length > 0 && (
            <Pagination
              className={classes.result_page_numbers}
              defaultPage={parseInt(query.page || "1", 10)}
              count={pages}
              onChange={pageHandler}
            />
          )}

          {products.length <= 0 && (
            <Box className={classes.no_search_results_img_container}>
              {Cookies.get("darkMode") === "ON" ? (
                <img
                  src="https://res.cloudinary.com/dgl5z5ozi/image/upload/v1667248113/Meraki-ecom/no-search-found-dark_hklbtg.gif"
                  alt="no results"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dgl5z5ozi/image/upload/v1667248111/Meraki-ecom/no-search-found-light_acqhd1.gif"
                  alt="no results"
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews",
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
