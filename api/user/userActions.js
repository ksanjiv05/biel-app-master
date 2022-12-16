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

// export const login = (body) => async (dispatch) => {
//   try {
//     const user = await axios
//       .post(`${url}${routes.login}`, body, requestConfig)
//       .catch((e) => {
//         throw e;
//       });

//     // console.log(user.data, "login res cread ", user);
//     await SecureStore.setItemAsync("token", user.data.token);

//     dispatch({
//       type: "login",
//       user,
//     });
//   } catch (e) {
//     console.log(e);
//     // dispatch({
//     //   type: "error",
//     //   error: e.response.data,
//     // });
//   }
// };

export const login = (body, callback) => async (dispatch) => {
  console.log(`call login  ${url}${routes.login}`);
  try {
    const user = await axios
      .post(`${url}${routes.login}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // console.log(user.data, "login res cread ", user);
    await SecureStore.setItemAsync("token", user.data.token);
    if (user.status == 200) {
      callback(true);
    } else {
      callback(false);
    }
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const changePassword = (body, cb) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.changePassword}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    cb(true);
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   error: e.response.data,
    // });
    cb(false);
  }
};

export const editUserDetails = (body, cb) => async (dispatch) => {
  try {
    body.isEditAllData = true;
    body.profilePic = body.image != null ? body.image.base64FileString : "";
    const user = await axios
      .post(`${url}${routes.editUserDetails}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "editUserDetails",
      user: user.data,
    });
    cb(true);
  } catch (e) {
    console.log(e);

    cb(false);
  }
};

export const editUserVarification = (body, cb) => async (dispatch) => {
  try {
    body.isEditAllData = false;
    const user = await axios
      .post(`${url}${routes.editUserDetails}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "editUserDetails",
      user: user.data,
    });
    cb(true);
  } catch (e) {
    console.log(e);
    cb(false);
  }
};

export const logout = (callback) => async (dispatch) => {
  try {
    await SecureStore.setItemAsync("token", "");
    callback(true);
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const register = (body, callback) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.register}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // dispatch({
    //   type: "register",
    //   user,
    // });
    if (user.status == 200) callback(true);
    else callback(false);
  } catch (e) {
    callback(false);
  }
};

export const getUsers = (body, callback) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.getUsers}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    dispatch({
      type: "getUsers",
      user: user.data.user,
    });
    // console.log("users ---++++", user.data.user);
    callback(true);
  } catch (e) {
    console.log("error", e.response.data);
    // dispatch({
    //   type: "error",
    //   error: e.response.data,
    // });
    callback(false);
  }
};

//
export const getCurrentUser = (body, callback) => async () => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const user = await axios
      .post(`${url}${routes.getCurrentUser}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    callback(user.data);
  } catch (e) {
    callback(null);
  }
};

export const setError = (body) => async (dispatch) => {
  dispatch({
    type: "error",
    error: body,
  });
};

export const isAuthanticate = async (body, callback) => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const responce = await axios
      .post(`${url}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // console.log("recponce form auth ", responce);
    if (responce.status == 200) callback(true);
    else callback(false);
  } catch (e) {
    callback(false);
  }
};

export const isAuthanticateX = async (body) => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const responce = await axios
      .post(`${url}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // console.log("recponce form auth ", responce);
    if (responce.status == 200) return true;
    else return false;
  } catch (e) {
    console.log("err auth ", e);
    return false;
  }
};

export const getCurrentUserX = async (body, callback) => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const user = await axios
      .post(`${url}${routes.getCurrentUser}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    callback(user.data);
  } catch (e) {
    callback(null);
  }
};

// export const setError = (body) => async (dispatch) => {
//   dispatch({
//     type: "error",
//     error: body,
//   });
// };

export const resetPassword = async (body, cb) => {
  try {
    const user = await axios
      .post(`${url}${routes.resetPassword}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    cb(true);
  } catch (e) {
    console.log(e);

    cb(false);
  }
};
