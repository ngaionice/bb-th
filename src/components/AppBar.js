import {
  AppBar as MuiAppBar,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link as RouterLink } from "react-router-dom";

function AppBar() {
  return (
    <>
      <MuiAppBar>
        <Toolbar>
          <ButtonBase
            variant="h6"
            component={RouterLink}
            to="/"
            color="secondary"
            underline="none"
            disableRipple
          >
            <Typography variant="h6">Bird & Be Co.</Typography>
          </ButtonBase>
          <Typography sx={{ flex: 1 }} />
          <IconButton component={RouterLink} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </>
  );
}

export default AppBar;
