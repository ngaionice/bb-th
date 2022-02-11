import { Divider, Grid, IconButton, Stack, Typography } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../context/cartContext";

function QuantityControl({ data, id }) {
  const { subscribe, name, price } = data;
  const [, dispatch] = useCart();

  const handleIncrement = () => {
    dispatch({ type: "increment", payload: { id, subscribe, name, price } });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement", payload: { id, subscribe, name, price } });
  };

  return (
    <Stack direction="row">
      <IconButton onClick={handleIncrement}>
        <AddCircleIcon />
      </IconButton>
      <IconButton onClick={handleDecrement}>
        <RemoveCircleIcon />
      </IconButton>
    </Stack>
  );
}

function CartItem({ data, id }) {
  const { subscribe, name, quantity } = data;
  return (
    <>
      <Grid item xs={6} sm={7} lg={8}>
        <Stack>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body2">
            {subscribe ? "Monthly" : "One-time"}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} sm={5} lg={4} container alignItems="center">
        <Grid item xs={8} lg={10}>
          <QuantityControl data={data} id={id} />
        </Grid>

        <Grid item xs={4} lg={2}>
          <Typography variant="body1">{`Qty:${quantity}`}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

function CartScreen() {
  const [cart] = useCart();

  const CartEntries = () => {
    if (Object.keys(cart).length === 0) {
      return <Typography variant="h6">Your cart is empty!</Typography>;
    }
    return (
      <Grid container alignItems="center">
        {Object.entries(cart).map(([k, v]) => {
          return <CartItem key={k} data={v} id={k} />;
        })}
      </Grid>
    );
  };

  const Cart = () => {
    if (Object.keys(cart).length === 0) {
      return (
        <Grid item xs={12} container justifyContent="center">
          <Typography variant="h6">Your cart is empty!</Typography>
        </Grid>
      );
    }
    return (
      <>
        <Grid item xs={12}>
          <CartEntries />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={3}>
            <Typography>Subtotal</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {`$${Object.values(cart)
                .reduce(
                  (curr_sum, entry) => curr_sum + entry.quantity * entry.price,
                  0
                )
                .toFixed(2)}`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Taxes</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {`$${(
                Object.values(cart).reduce(
                  (curr_sum, entry) => curr_sum + entry.quantity * entry.price,
                  0
                ) * 0.13
              ).toFixed(2)}`}
            </Typography>
          </Grid>

          <Grid item xs={4} paddingTop={2}>
            <Divider />
          </Grid>
          <Grid item xs={8} />

          <Grid item xs={3} paddingTop={2}>
            <Typography>Total</Typography>
          </Grid>

          <Grid item xs={9} paddingTop={2}>
            <Typography>{`$${(
              Object.values(cart).reduce(
                (curr_sum, entry) => curr_sum + entry.quantity * entry.price,
                0
              ) * 1.13
            ).toFixed(2)}`}</Typography>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          Cart
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Cart />
    </Grid>
  );
}

export default CartScreen;
