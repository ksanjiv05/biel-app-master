import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userApi from "./user/userStateManager";
import shipmentApi from "./shipment/shipmentStateManager";
import articleApi from "./newsArticle/newsArticleStateManager";
import notificationApi from "./notification/notificationStateManager";

const initialState = {};
const middleware = [thunk];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      userApi,
      shipmentApi,
      articleApi,
      notificationApi,
    }),
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
};

export default configureStore;
