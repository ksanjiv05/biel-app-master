import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const design = (insets, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      paddingHorizontal: 50,
      // justifyContent: "center",
      // justifyContent: "flex-end",
      backgroundColor: "transparent",
      // paddingTop: 200,
      // alignItems: "center",
    },
    mainBg: {
      flex: 1,
    },
    username: {
      marginVertical: 10,
      borderRadius: 40,
    },
    errorMsg: {
      marginLeft: 10,
      fontSize: 14,
      paddingTop: 0,
      marginTop: -5,
      color: "red",
    },
    usernameTextStyle: {
      height: 40,
    },
    password: {
      marginVertical: 10,
      borderRadius: 40,
    },
    passwordTextStyle: {
      height: 40,
    },
    loginBtn: {
      height: 50,
      // marginTop: 10,
      borderRadius: 40,
    },
    signupTxt: {
      color: "white",
      borderRadius: 40,
      height: 50,
      marginBottom: Platform.OS === "ios" ? insets.bottom + 60 : 80,
      // marginBottom: Platform.OS === "ios" ? insets.bottom + 60 : 80,
    },
  });

export default design;
