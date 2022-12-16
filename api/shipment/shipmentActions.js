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

export const addShipment = (body, callback) => async (dispatch) => {
  try {
    body.formName = "addShipment";

    let shipment = await axios
      .post(`${url}${routes.addShipment}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    if (shipment.data.status == "new") {
      dispatch({
        type: "addShipment",
        shipment: shipment.data,
      });
    }

    callback(true);
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   message: e || e.response.data.message,
    // });
    callback(false);
  }
};

export const getShipments = (body, cb) => async (dispatch) => {
  try {
    token = await SecureStore.getItemAsync("token");
    requestConfig.headers["X-Auth-Token"] = token;

    let shipments = await axios
      .post(`${url}${routes.getShipments}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    cb(true);

    dispatch({
      type: "getShipments",
      shipment: shipments.data,
    });
  } catch (e) {
    // dispatch({
    //   type: "error",
    //   message: e.response.data.message,
    // });
    cb(false);
  }
};

export const getAllShipments = (body, cb) => async (dispatch) => {
  try {
    token = await SecureStore.getItemAsync("token");
    requestConfig.headers["X-Auth-Token"] = token;

    let shipments = await axios
      .post(`${url}${routes.getAllShipments}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    cb(true);

    dispatch({
      type: "getAllShipments",
      shipment: shipments.data,
    });
  } catch (e) {
    dispatch({
      type: "error",
      message: e.response.data.message,
    });
    cb(false);
  }
};

export const getShipmentDetails = (body, cb) => async (dispatch) => {
  try {
    let shipment = await axios
      .post(`${url}${routes.getShipmentDetails}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // console.log("--ship---", shipment.data);
    cb(true);

    dispatch({
      type: "getShipmentDetails",
      shipment: shipment.data,
    });
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   message: e || e.response.data.message,
    // });
    cb(false);
  }

  // axios
  //   .get(
  //     apiConfig.host + apiConfig.adminBaseUrl + "/getAllShipments" + queryString
  //   )
  //   .then((res) => res.data)
  //   .then((data) => {
  //     const obj = {
  //       shipmentData: {},
  //     };
  //     Object.keys(data.success[0]).map((v) => {
  //       if (data.success[0][v].length == 1) {
  //         obj.shipmentData[v] = data.success[0][v][0];
  //         return;
  //       } else if (data.success[0][v].length > 1) {
  //         obj[v] = data.success[0][v];
  //       } else {
  //         console.log("no data");
  //       }
  //     });
  //     dispatch({
  //       type: "getAllShipmentData",
  //       shipment: obj,
  //     });
  //     cb(true);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     cb(false);
  //   });
};

export const packagingMatrialStatus = (body, callback) => async (dispatch) => {
  try {
    body.formName = "packagingMatrialStatus";

    let packagingMaterialStatus = await axios
      .post(`${url}${routes.packagingMaterialStatus}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "packagingMatrialStatus",
      shipment: packagingMaterialStatus.data,
    });

    callback(true);
  } catch (e) {
    console.log(e);
    dispatch({
      type: "error",
      message: e || e.response.data.message,
    });
    callback(false);
  }
};

export const scheduleUpdate = (body, callback) => async (dispatch) => {
  try {
    body.formName = "scheduleUpdate";
    let schedule = await axios
      .post(`${url}${routes.schedule}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "scheduleUpdate",
      shipment: schedule.data,
    });
    callback(true);
  } catch (e) {
    console.log(e);
    dispatch({
      type: "error",
      message: e || e.response.data.message,
    });
    callback(false);
  }
};

export const productionScheduleUpdate =
  (body, callback) => async (dispatch) => {
    try {
      body.formName = "productionScheduleUpdate";

      let productionSchedule = await axios
        .post(`${url}${routes.productionSchedule}`, body, requestConfig)
        .catch((e) => {
          throw e;
        });

      dispatch({
        type: "productionScheduleUpdate",
        shipment: productionSchedule.data,
      });

      callback(true);
    } catch (e) {
      console.log(e);
      dispatch({
        type: "error",
        message: e || e.response.data.message,
      });
      callback(false);
    }
  };

export const documentStatusUpdate = (body, callback) => async (dispatch) => {
  try {
    body.formName = "documentStatusUpdate";

    let documentStatus = await axios
      .post(`${url}${routes.documentStatus}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    dispatch({
      type: "documentStatusUpdate",
      shipment: documentStatus.data,
    });

    callback(true);
  } catch (e) {
    console.log(e);
    dispatch({
      type: "error",
      message: e || e.response.data.message,
    });
    callback(false);
  }
};

export const shipmentScheduleUpdate = (body, callback) => async (dispatch) => {
  try {
    body.formName = "shipmentScheduleUpdate";

    let shipmentSchedule = await axios
      .post(`${url}${routes.shipmentSchedule}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    dispatch({
      type: "shipmentScheduleUpdate",
      shipment: shipmentSchedule.data,
    });

    callback(true);
  } catch (e) {
    console.log(e);
    dispatch({
      type: "error",
      message: e || e.response.data.message,
    });
    callback(false);
  }
};

export const documentDispatchStatusUpdate =
  (body, callback) => async (dispatch) => {
    try {
      body.formName = "documentDispatchStatusUpdate";

      let documentDispatchStatus = await axios
        .post(`${url}${routes.documentDispatchStatus}`, body, requestConfig)
        .catch((e) => {
          throw e;
        });

      dispatch({
        type: "documentDispatchStatusUpdate",
        shipment: documentDispatchStatus.data,
      });

      callback(true);
    } catch (e) {
      console.log(e);
      dispatch({
        type: "error",
        message: e || e.response.data.message,
      });
      callback(false);
    }
  };

export const currencyData = (body, callback) => async (dispatch) => {
  try {
    let currencyStatus = await axios
      .post(url + "/api/v0.0.1/shipment/getCurrency", body, requestConfig)
      .catch((e) => {
        throw e;
      });
    // console.log("currency data", currencyStatus.data?.currency);
    callback(currencyStatus.data?.currency);
  } catch (err) {
    console.log("currency err ", err);
    callback(null);
  }
};

// const fileUpload = async (body, callback, progressCb) => {
//   let uploadedFiles = body.document.map(async (file) => {
//     let formData = new FormData();

//     formData.append("formId", body.formId);
//     formData.append("formName", body.formName);
//     formData.append("file", file);

//     await axios
//       .post(`${url}${routes.fileUpload}`, formData, {
//         headers: requestConfigMultipart.headers,
//         onUploadProgress: (data) => {
//           let progress = Math.round((100 * data.loaded) / data.total);
//           progressCb({ id: file.id, progress });
//         },
//       })
//       .catch((e) => {
//         throw e;
//       });

//     return file;
//   });

//   Promise.all(uploadedFiles).then((result) => callback(result));
// };

//---------------------------push notification call-------------------------
const sendNotification = async (email, title, message) => {
  try {
    let notificationStatus = await axios
      .post(
        url + "/api/v0.0.1/notification/sendNotification",
        { email, title, message },
        requestConfig
      )
      .catch((e) => {
        throw e;
      });
    console.log("notification status ", notificationStatus.data);
    return;
  } catch (err) {
    console.log("currency err ", err);
    return;
  }
};

//for  pulll to refresh
export const getMoreShipments = (body, cb) => async (dispatch) => {
  try {
    token = await SecureStore.getItemAsync("token");
    requestConfig.headers["X-Auth-Token"] = token;

    let shipments = await axios
      .post(`${url}${routes.getShipments}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    cb(true);

    dispatch({
      type: "getShipments",
      shipment: shipments.data,
    });
  } catch (e) {
    // dispatch({
    //   type: "error",
    //   message: e.response.data.message,
    // });
    cb(false);
  }
};
