import { StyleSheet, Platform, StatusBar } from "react-native";

const design = (insets, theme) =>
  StyleSheet.create({
    mainBg: {
      flex: 1,
      backgroundColor: theme["color-primary-500"],
    },
    footer: {
      position: "absolute",
      height: 60 + (Platform.OS === "ios" ? insets.bottom : 20),
      paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
      overflow: "visible",
    },
    optionsContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    icons: {
      height: 20,
      width: 20,
    },
    text: {
      fontSize: 12,
      top: 5,
      fontWeight: "700",
    },
    plusIcon: {
      height: 30,
      width: 30,
    },
  });

export default design;
