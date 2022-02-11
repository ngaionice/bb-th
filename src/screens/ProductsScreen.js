import { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { formReducer } from "../reducers/formReducer";
import { useCart } from "../context/cartContext";

import TextField from "../components/TextField";
import RadioButtons from "../components/RadioButtons";

function ProductFormSection({ formData, modifier, dispatch }) {
  const { display_name, type, config, option_values } = modifier;
  if (type === "text") {
    return (
      <TextField
        formData={formData}
        label={display_name}
        dispatch={dispatch}
        config={config}
      />
    );
  } else if (type === "radio_buttons") {
    return (
      <RadioButtons
        label={display_name}
        option_values={option_values}
        dispatch={dispatch}
      />
    );
  }
}

function ProductDialog({ open, setOpen, data }) {
  const [formData, dispatchForm] = useReducer(formReducer, {
    subscribe: "One-time",
  });
  const [, dispatchCart] = useCart();

  const { name, description, modifiers, primary_image, price, id } = data;
  const { description: brief_description, url_standard } = primary_image;

  const handleSave = () => {
    const { subscribe } = formData;
    dispatchCart({
      type: "increment",
      payload: { id, name, subscribe, price },
    });
    dispatchForm({ type: "reset" });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
          {name}
        </Container>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <img
                src={url_standard}
                alt={brief_description}
                width="200"
                height="200"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Typography>Your info:</Typography>
                {modifiers.map((m) => (
                  <ProductFormSection
                    formData={formData}
                    modifier={m}
                    dispatch={dispatchForm}
                    key={m.id}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  disableElevation
                >
                  {`Add to cart - $${
                    formData["subscribe"] === "One-time" ? price : price * 0.9
                  }`}
                </Button>
                <Button onClick={handleClose} variant="outlined">
                  Close
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

function ProductCard({ data }) {
  const { name, primary_image, price, meta_description } = data;
  const { description: brief_description, url_standard } = primary_image;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card variant="outlined">
        <CardActionArea onClick={() => setOpenDialog(true)}>
          <CardHeader
            title={name}
            subheader={`$${price}`}
            titleTypographyProps={{ variant: "subtitle2" }}
            subheaderTypographyProps={{ variant: "subtitle2" }}
          />
          <CardMedia
            component="img"
            image={url_standard}
            alt={brief_description}
            height="200"
          />
          <CardContent>
            <Typography variant="body2" noWrap>
              {meta_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ProductDialog open={openDialog} setOpen={setOpenDialog} data={data} />
    </Grid>
  );
}

function ProductsScreen() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchThenLoad = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://web-ge8buw2ff-bird-and-be.vercel.app/api/interview"
      );
      if (mounted) {
        setProducts(data["products"]);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchThenLoad().catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const GridContent = () => {
    if (loading) {
      return (
        <Grid item xs={12} container justifyContent="center">
          <CircularProgress />
        </Grid>
      );
    }
    return products.map((p, i) => <ProductCard key={i} data={p} />);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          Products
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <GridContent />
    </Grid>
  );
}

export default ProductsScreen;
