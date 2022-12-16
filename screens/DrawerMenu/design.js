import { StyleSheet, Platform, StatusBar } from "react-native";

export default design = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
      paddingVertical: 50,
      justifyContent: "space-between",
    },
    profile: {
      marginTop: Platform.OS === "ios" ? 30 : 0,
      marginHorizontal: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    avatar: {
      height: 70,
      width: 70,
    },
    name: {
      marginTop: 10,
      fontWeight: "700",
      fontSize: 18,
    },
    menu: {
      marginTop: 50,
    },
    drawerGroup: {
      backgroundColor: "white",
    },
    toggleIcon: {
      marginRight: 10,
    },
  });
