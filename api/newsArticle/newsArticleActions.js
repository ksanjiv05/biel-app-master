import axios from "axios";
import * as SecureStore from "expo-secure-store";
import uuid from "react-native-uuid";

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

export const addArticle = (body, callback) => async (dispatch) => {
  try {
    // await fileUpload(body,uplodedImageObj=>{
    // if(uplodedImageObj)
    body.image = body.image.base64FileString;
    //  else  delete body.image;

    body.artId = uuid.v4();
    axios
      .post(`${url}${routes.addArticle}`, body, requestConfig)
      .then((article) => {
        dispatch({
          type: "addArticle",
          article: article.data,
        });

        callback(true);
      })
      .catch((e) => {
        throw e;
      });

    // })
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const updateArticle = (body, callback) => async (dispatch) => {
  try {
    body.image = body.image.base64FileString;
    axios
      .post(url + "/api/v0.0.1/news/editArticle", body, requestConfig)
      .then((article) => {
        dispatch({
          type: "updateArticle",
          article: article.data,
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
export const getArticles = (body, callback) => async (dispatch) => {
  try {
    axios
      .post(`${url}${routes.getArtiles}`, body, requestConfig)
      .then((articles) => {
        dispatch({
          type: "getArticles",
          article: articles.data,
        });

        callback();
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    callback();
  }
};

const fileUpload = async (body, callback, progressCb) => {
  // if(!body.image) return null;
  let formData = new FormData();
  formData.append("formId", "news-assets");
  formData.append("formName", "articles-pic");
  formData.append("file", body.image);

  const result = await axios
    .post(`${url}${routes.fileUpload}`, formData, {
      headers: requestConfigMultipart.headers,
      onUploadProgress: (data) => {
        let progress = Math.round((100 * data.loaded) / data.total);
        // progressCb({ id: file.id, progress });
      },
    })
    .catch((e) => {
      throw e;
    });

  callback(result.data);
};
