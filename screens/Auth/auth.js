import axios from "axios";
import * as SecureStore from "expo-secure-store";
// import { host } from "../../config/api";
// import { upload } from "../../common/FileUpload/fileUpload";

storeCread = async (key, value) => await SecureStore.setItemAsync(key, value);

// const login = (creds, cb) => {
//   //verified
//   axios
//     .post(host + "/api/v0.0.1/user/login", creds)
//     .then(async (res) => {
//       if (res.status == 200) {
//         await storeCread("token", res.data.token);
//         await storeCread("username", res.data.username);
//         await storeCread("name", res.data.name);
//         await storeCread("pic", res.data.pic);
//         cb(true);
//       } else cb(false);
//     })
//     .catch((err) => {
//       console.log(err); //TODO: display error on screen
//       cb(false);
//     });
// };

// const register = (data, cb) => {
//   upload(data.profilePic, (fileObj) => {
//     if (fileObj) {
//       console.log(fileObj);
//       data.profilePic = fileObj[0].path;
//       axios
//         .post(host + "/api/v0.0.1/user/reg", data)
//         .then((res) => {
//           if (res.status == 200) {
//             console.log(res.data);

//             cb(true);
//           } else cb(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           cb(false);
//         });
//     } else {
//       alert("somthing wrong");
//     }
//   });
// };

const isAuthanticate = (token) => {
  if (token.length > 10) return true;
  return false;
};

const logout = async () => {
  await storeCread("token", "");
  await storeCread("username", "");
  await storeCread("name", "");
  await storeCread("pic", "");
  return true;
};

async function getValueFromStore(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    // alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    return "";
    // alert("No values stored under that key.");
  }
}

export { isAuthanticate, getValueFromStore, logout };
