const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, packagingCost = {} } = action;
  switch (type) {
    case "addPackagingCost":
      return [packagingCost, ...state];
    case "getAllPackagingCost":
      return [...packagingCost];
    case "updatePackagingCost":
      return [
        ...state.filter((packagingObj) => packagingObj._id != packagingCost.artId),
        article,
      ];

    default:
      return state;
  }
};

export default stateManager;
