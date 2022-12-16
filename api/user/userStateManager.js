const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, user = [] } = action;
  switch (type) {
    // case "login":
    //   return { ...user, isLogin: true };
    // case "register":
    //   return { ...user, isLogin: true };
    case "getUsers":
      // return { clients: user, isLogin: false };
      return [...user];
    // case "editUserDetails":
    //   const newState = state.filter(
    //     (userObj) => userObj.email !== user.user.email
    //   );
    //   newState.push(user.user);
    //   state.clients = newState;
    //   return state;

    default:
      return state;
  }
};

export default stateManager;
