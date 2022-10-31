import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // shared
  cursor_pointer: {
    cursor: "pointer",
  },
  transparent_backgroud: {
    backgroundColor: "transparent",
  },
  table_headings: {
    color: "#0f172a !important",
  },
  selected_heading: {
    fontSize: "3rem",
  },
  btn_primary: {
    backgroundColor: "#0891b2",
    color: "#ecfeff",
  },

  // layout
  navbar: {
    backgroundColor: "#164e63",
    color: "#ecfeff",
    display: "flex",
    justifyContent: "between",
    position: "fixed",
    height: "4rem",
    marginBottom: "2.5rem",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  nav_menu_icon: {
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  nav_menu_close_icon: {
    fontSize: "1.3rem",
    marginLeft: "2rem",
    cursor: "pointer",
  },
  brand_container: {
    width: "max-content",
    display: "flex",
    alignItems: "center",
    padding: "0 !important",
    gap: "1rem",
  },
  brand: {
    fontSize: "1.7rem",
    cursor: "pointer",
  },
  nav_link_container: {
    display: "flex",
    marginTop: "0.3rem",
    alignItems: "center",
    gap: "0.8rem",
  },
  nav_link: {
    fontSize: "1.6rem",
    cursor: "pointer",
  },
  nav_dark_mode_icons: {
    fontSize: "1.6rem",
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  grow: {
    flexGrow: 1,
  },
  nav_menu: {
    backgroundColor: "#0e7490",
  },
  nav_button: {
    fontSize: "1.2rem",
    backgroundColor: "#155e75",
    padding: "0.2rem 0.7rem 0.2rem 0.7rem",
    marginLeft: "1rem",
    borderRadius: "0.3rem",
    color: "#ffffff",
    textTransform: "initial",
    "&:hover": {
      backgroundColor: "#0e7490",
    },
  },

  main: {
    position: "relative",
    top: "4rem",
    paddingTop: "1.5rem",
    minHeight: "90vh",
  },
  footer: {
    backgroundColor: "#164e63",
    height: "3rem",
    marginTop: "6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#ecfeff",
    gap: "1.5rem",
  },

  // search
  searchSection: {
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  searchForm: {
    width: "70%",
    display: "flex",
    border: "1px solid #0e7490",
    backgroundColor: "#0e7490",
    borderRadius: "0.5rem",
  },
  searchInput: {
    paddingLeft: "0.3rem",
    color: "#ecfeff",
    "& ::placeholder": {
      color: "#ecfeff",
    },
  },
  iconButton: {
    fontSize: "1.4rem",
    padding: "0.4rem",
    "& span": {
      color: "#ecfeff",
    },
  },

  // Not Found
  not_found_container: {
    backgroundColor: "#ecfeff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Product card
  product_card: {
    backgroundColor: "#ecfeff",
    color: "#0f172a",
    width: "18rem",
    height: "21rem",
  },
  product_card_img: {
    width: "100% !important",
    height: "13.5rem",
    objectFit: "fill !important",
  },
  product_card_details: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: 0,
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
  },
  product_btn_container: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginBottom: "1rem",
  },
  product_card_btn: {
    fontSize: "1.5rem",
    color: "#0e7490",
    cursor: "pointer",
  },

  // product details page
  product_details_page_card: {
    backgroundColor: "#ecfeff",
    color: "#0f172a",
    width: "60%",
  },
  product_details_page_back_btn: {
    marginBottom: "1rem",
  },

  // cart page
  cart_page_icon: {
    fontSize: "1.2rem",
    color: "#0e7490",
  },
  cart_details_card: {
    color: "#0f172a",
    backgroundColor: "#ecfeff",
  },
  cart_details_card_heading: {
    fontSize: "1.3rem",
  },

  // login and register
  form: {
    width: "60%",
    border: "1px solid",
    padding: "2rem",
    borderRadius: "1rem",
  },
  login_container: {
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },
  login_form_buttons_container: {
    width: "63%",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    marginBottom: "0.5rem",
    "@media (min-width: 850px)": {
      flexDirection: "row",
    },
  },
  auth_heading: {
    textAlign: "center",
  },

  // place order screen
  place_order_cards: {
    marginTop: "1.5rem",
    padding: "1rem",
    color: "#0f172a",
    backgroundColor: "#ecfeff",
  },

  place_order_cards_text: {
    fontSize: "1.3rem",
  },

  // order details page
  order_detail_cards: {
    marginTop: "1.5rem",
    padding: "1rem",
    color: "#0f172a",
    backgroundColor: "#ecfeff",
  },
  order_details_heading: {
    fontSize: "1.3rem",
  },
  order_details_heading_container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  order_id: {
    fontSize: "1.3rem",
    marginTop: "1rem",
  },
  paypal_button_container: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  // user select
  user_select: {
    marginTop: "1rem",
  },
  // order history
  order_history_cards: {
    marginTop: "1rem",
    padding: "1rem",
    color: "#0f172a",
    backgroundColor: "#ecfeff",
  },

  // user profile
  user_profile_card: {
    marginTop: "1rem",
    padding: "1rem",
    color: "#0f172a",
    backgroundColor: "#ecfeff",
  },
  user_profile_form: {
    marginTop: "1rem",
    width: "100%",
    padding: "2rem",
    borderRadius: "1rem",
    border: "1px solid",
  },
  user_profile_heading_container: {
    display: "flex",
    justifyContent: "center",
  },
  user_profile_heading: {
    fontSize: "2rem",
  },

  // table icons
  table_icons: {
    fontSize: "1.2rem",
    color: "#155e75",
  },
  // admin dashboard
  admin_dashboard_cards: {
    color: "#0f172a",
    backgroundColor: "#ecfeff",
    borderRadius: "0.5rem",
  },
  admin_card_grid: {
    marginBottom: "1.5rem !important",
  },

  // admin orders
  admin_orders_table: {
    color: "#0f172a",
    backgroundColor: "#ecfeff",
    padding: "1rem",
  },
  admin_orders_heading: {
    fontSize: "1.5rem",
  },
  deliver_btn_container: {
    display: "flex",
    flexDirection: "column",
  },

  // admin products
  admin_products_heading: {
    fontSize: "1.5rem",
  },
  admin_products_table: {
    color: "#0f172a",
    backgroundColor: "#ecfeff",
    padding: "1rem",
  },

  // edit product page
  edit_product_container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  edit_product_form: {
    width: "100%",
    border: "1px solid",
    padding: "2rem",
    borderRadius: "1rem",
  },
  edit_product_form_heading: {
    fontSize: "1.7rem",
  },
  edit_product_btn: {
    fontSize: "0.7rem",
    backgroundColor: "#0891b2",
    color: "#ecfeff",
    "&:hover": {
      backgroundColor: "#164e63",
    },
  },
  edit_product_btn_container: {
    display: "flex",
    justifyContent: "end",
    marginBottom: "0.5rem",
  },

  // admin users
  users_table: {
    color: "#0f172a",
    backgroundColor: "#ecfeff",
    padding: "1rem",
  },
  users_form_heading: {
    fontSize: "1.5rem",
  },
  edit_user_container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  edit_user_form: {
    width: "100%",
    border: "1px solid",
    padding: "2rem",
    borderRadius: "1rem",
  },
  edit_user_form_heading: {
    fontSize: "1.7rem",
  },

  // search page
  filters_sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      width: "20%",
      position: "fixed",
      justifyContent: "center",
    },
  },
  filters_sidebar_headings: {
    marginBottom: "0.1rem",
  },
  filters_sidebar_select: {
    width: "100%",
  },
  search_results_header: {
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  sort_by_select: {
    marginLeft: "0.5rem",
  },
  search_result_page_header: {
    marginBottom: "1.3rem",
  },
  result_page_numbers: {
    marginTop: "1.5rem",
  },
  no_search_results_img_container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: "3rem",
  },
}));
export default useStyles;
