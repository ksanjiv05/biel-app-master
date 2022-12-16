import { StyleSheet, Platform, StatusBar } from "react-native";

const design = (insets, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    input: {
      marginVertical: 6,
      marginHorizontal: 18,
    },
    inputHalf: {
      width: "48%",
    },
    input30: {
      width: "30%",
    },
    input145: {
      width: 115,
    },
    input66: {
      width: "66%",
    },
    inputHorizontalGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 18,
    },
    footerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      paddingVertical: 0,
      paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
      paddingHorizontal: 0,
    },
    footerBtn: {
      minHeight: 60,
      minWidth: "40%",
      marginBottom: 0,
      borderRadius: 100,
      borderWidth: 0,
    },
    warningContainer: {
      width: "70%",
    },
    warningContainerCard: {
      flex: 1,
      borderWidth: 0,
    },
    warningMsg: {
      padding: 18,
    },
    warningFooterContainer: {
      flexDirection: "row",
    },
    warningBtn: {
      borderWidth: 0,
      width: "50%",
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    divider: {
      marginBottom: 10,
      marginTop: 10,
    },
    dividerStatusBar: {
      marginTop: 10 - StatusBar.currentHeight,
    },
    autoCompleteFix: {
      marginBottom: StatusBar.currentHeight,
    },
    autoCompleteItemAction: {
      borderColor: theme["color-basic-500"],
      borderBottomWidth: 1,
    },
    flag: {
      height: 15,
      width: 20,
    },
    inputGroup: {
      top: -50,
    },
    inputGroupRadio: {
      flexDirection: "row",
      marginHorizontal: 18,
      marginTop: 10,
      flexWrap: "wrap",
    },
    radio: {
      margin: 2,
    },
  });

export default design;
