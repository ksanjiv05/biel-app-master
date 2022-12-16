// only use to update shipment state
const initialState = {};

const stateManager = (state = initialState, action) => {
  const { type, notification = {} } = action;
  switch (type) {
    case "getNotification":
      return notification;
    default:
      return state;
  }
};

export default stateManager;
