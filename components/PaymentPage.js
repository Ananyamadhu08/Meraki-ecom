import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { useStore } from "../context";
import CheckoutWizard from "./CheckoutWizard";

export default function PaymentPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch } = useStore();
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress?.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Payment method is required", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });

      Cookies.set("paymentMethod", paymentMethod);

      router.push("/place-order");
    }
  };

  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <div
        style={{
          height: "65vh",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className={classes.form} onSubmit={submitHandler}>
          <Typography component="h1" variant="h1">
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </div>
    </div>
  );
}
