import React from "react";
import { Button, Card, List, ListItem, Typography } from "@material-ui/core";
import { useStyles } from "../../utils";

function CartDetailsCard({ cartItems }) {
  const classes = useStyles();

  return (
    <Card className={classes.cart_details_card}>
      <List>
        <ListItem>
          <Typography className={classes.cart_details_card_heading}>
            Quantity: {cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography className={classes.cart_details_card_heading}>
            Subtotal: Rs.
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
          </Typography>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" fullWidth>
            Check Out
          </Button>
        </ListItem>
      </List>
    </Card>
  );
}

export default CartDetailsCard;
