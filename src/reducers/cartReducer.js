function cartReducer(state, action) {
  const { id, subscribe, name, price } = action.payload;
  const idString = String(id);
  switch (action.type) {
    case "increment":
      return {
        ...state,
        [idString]: {
          subscribe,
          quantity: (state[idString]?.quantity ?? 0) + 1,
          name,
          price,
        },
      };
    case "decrement":
      // ignore if no such item in cart
      if (!Object.keys(state).includes(idString)) break;
      // if only 1 in cart, drop item from cart
      if (state[idString].quantity <= 1) {
        delete state[idString];
        return {
          ...state,
        };
      }
      // else decrement by 1
      else {
        return {
          ...state,
          [idString]: {
            subscribe: state[idString].subscribe,
            quantity: state[idString].quantity - 1,
            name,
            price,
          },
        };
      }
    default:
      throw new Error("Invalid action.type passed to cartReducer.");
  }
}

function initializeCart() {
  return localStorage.getItem("bb-cart")
    ? JSON.parse(localStorage.getItem("bb-cart"))
    : {};
}

export { cartReducer, initializeCart };
