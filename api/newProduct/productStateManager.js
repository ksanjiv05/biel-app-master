// only use to update shipment state
const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, product = {} } = action;
  switch (type) {
    case "addProduct":
      return [product, ...state];
    case "getProducts":
      return [...product];
    case "updateProduct":
      return [
        ...state.filter((productObj) => productObj._id != product._id),
        product,
      ];

    default:
      return state;
  }
};

export default stateManager;
