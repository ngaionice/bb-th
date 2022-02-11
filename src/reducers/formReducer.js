function formReducer(state, action) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "subscribe":
      return {
        ...state,
        subscribe: action.payload,
      };
    case "reset":
      return {
        subscribe: "One-time",
      };
    default:
      throw new Error("Invalid action.type passed to formReducer.");
  }
}

export { formReducer };
