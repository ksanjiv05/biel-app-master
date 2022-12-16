import axios from "axios";
import * as SecureStore from "expo-secure-store";

import {
  url,
  routes,
  requestConfig,
  requestConfigMultipart,
} from "../../config/api.json";

let token = "";
(async () => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  requestConfigMultipart.headers["X-Auth-Token"] = token;
})();

export const saveToken = async (body, callback) => {
  try {
    console.log("save token run ", body);
    let token = await axios
      .post(url + "/api/v0.0.1/notification/expoToken", body, requestConfig)
      .catch((e) => {
        throw e;
      });
    console.log("token ", token.data);
    callback(true);
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const getNotification = (body, cb) => async (dispatch) => {
  try {
    token = await SecureStore.getItemAsync("token");
    requestConfig.headers["X-Auth-Token"] = token;
    let notifications = await axios
      .post(
        url + "/api/v0.0.1/notification/getNotification",
        body,
        requestConfig
      )
      .catch((e) => {
        throw e;
      });
    cb(true);
    dispatch({
      type: "getNotification",
      notification: notifications.data.notification,
    });
  } catch (e) {
    console.log(e);
    cb(false);
  }
};
