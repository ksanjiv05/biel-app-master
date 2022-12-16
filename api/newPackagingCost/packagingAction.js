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

export const addPackagingCost = (body, callback) => async (dispatch) => {
  try {
    body.image = body.image.base64FileString;
    axios
      .post(`${url}${routes.addPackagingCost}`, body, requestConfig)
      .then((packagingCost) => {
        dispatch({
          type: "addPackagingCost",
          packagingCost: packagingCost.data,
        });

        callback(true);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const updatePackagingCost = (id, body, callback) => async (dispatch) => {
  try {
    body.image = body.image.base64FileString;
    axios
      .post(`${url}${routes.updatePackagingCost}${id}`, body, requestConfig)
      .then((packagingCost) => {
        dispatch({
          type: "updatePackagingCost",
          packagingCost: packagingCost.data,
        });

        callback(true);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const getAllPackagingCost = (body, callback) => async (dispatch) => {
  try {
    axios
      .post(`${url}${routes.getAllPackagingCost}`, body, requestConfig)
      .then((packagingCosts) => {
        dispatch({
          type: "getAllPackagingCost",
          packagingCostList: packagingCosts.data,
        });

        callback(packagingCosts.data);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    callback();
  }
};

export const deletePackaging = (id, body, callback) => async (dispatch) => {
	try {
		axios
			.post(`${url}${routes.deletePackagingCost}${id}`, body, requestConfig)
			.then((packagingCost) => {
				callback(true);
			})
	} catch (error) {
		console.log(error);
		callback(false)
	}
}