import { StyleSheet, Platform, StatusBar } from "react-native";

const design = (insets, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    innerContainer: {
      paddingBottom: 160,
    },
    input: {
      flex: 1,
      marginVertical: 6,
      marginHorizontal: 18,
    },
    inputHalf: {
      width: "48%",
    },
    input30: {
      width: "30%",
    },
    input40: {
      width: "40%",
    },
    inputHorizontalGroup: {
      flexDirection: "row",
      marginHorizontal: 18,
      justifyContent: "space-between",
    },
    inputHorizontalGroupMarginBottom: {
      marginBottom: 20,
    },
    inputGroup: {
      flexDirection: "column",
      marginHorizontal: 18,
      marginVertical: 20,
    },
    amountContainer: {
      alignItems: "flex-end",
      marginHorizontal: 18,
      marginVertical: 25,
    },
    section: {
      marginBottom: 20,
      marginTop: 5,
    },
    amountLabel: {
      color: "#a5a5a5",
    },
    amount: {
      fontSize: 20,
    },
    footerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      paddingVertical: 0,
      paddingBottom: Platform.OS === "ios" ? insets.bottom : 20,
      paddingHorizontal: 0,
      minHeight: 100,
      width: "100%",
      backgroundColor: theme["color-basic-200"],
      position: "absolute",
      bottom: 0,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      elevation: 8,
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
    buttonGroupBtn: {
      backgroundColor: theme["color-basic-500"],
      marginHorizontal: 1,
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
    itemBelowAutoCompleteFix: {
      top: 20 - StatusBar.currentHeight,
      marginBottom: 5,
    },
    itemBelowAgent: {
      top: 5 - StatusBar.currentHeight,
      marginBottom: -10,
    },
    autoCompleteItemAction: {
      borderColor: theme["color-basic-500"],
      borderBottomWidth: 1,
    },
    dividerBelowAutoCompleteFix: {
      top: -StatusBar.currentHeight + 5,
      marginHorizontal: 18,
      marginBottom: -65,
    },
    uploadArea: {
      margin: 2,
      height: 150,
      borderColor: theme["color-basic-400"],
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: "dashed",
      marginTop: 20,
      marginBottom: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    uploadIcon: {
      height: 50,
      width: 50,
      color: theme["color-basic-400"],
    },
    errorMsg: {
      marginHorizontal: 18,
      marginVertical: 10,
      fontSize: 15,
    },
    progressBar: {
      backgroundColor: theme["color-success-400"],
      height: 3,
    },
    flag: {
      height: 15,
      width: 20,
    },
    heading: {
      marginHorizontal: 18,
    },
    orderNumber: {
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme["color-primary-500"],
    },
    agent: {
      marginTop: 60,
    },
    clientSubTitle: {
      fontSize: 10,
      color: theme["color-primary-400"],
    },
  });

export default design;
