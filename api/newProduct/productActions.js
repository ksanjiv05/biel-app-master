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

export const addProduct = (body, callback) => {
  try {
    body.image = body.image.base64FileString;

    axios
      .post(`${url}${routes.addProduct}`, body, requestConfig)
      .then((product) => {
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

export const getProducts = (body, callback) => {
  try {
    axios
      .post(`${url}${routes.getProducts}`, body, requestConfig)
      .then((products) => {
        callback(products.data);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    callback();
  }
};

export const updateProduct = (body, id, callback) => {
	try {
    body.image = body.image.base64FileString;
		axios
			.post(`${url}${routes.editProduct}${id}`, body, requestConfig)
			.then((product) => {
				callback(true)
			})
	} catch (error) {
		console.log(e);
		callback();
	}
}