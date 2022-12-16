import { StyleSheet } from "react-native";

export default design = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingHorizontal: 18,
      backgroundColor: theme["color-basic-200"],
      paddingBottom: 80,
    },
    scrollView: {
      marginBottom: 37,
    },
    clientContainer: {
      flexDirection: "row",
      marginTop: 20,
      alignItems: "center",
      marginBottom: 40,
    },
    avatar: {
      borderRadius: 10,
      height: 50,
      width: 50,
    },
    nameContainer: {
      flex: 3,
      marginHorizontal: 15,
    },
    clientLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: theme["color-basic-600"],
    },
    name: {
      fontSize: 18,
      fontWeight: "500",
    },
    company: {
      fontSize: 12,
      color: theme["color-basic-600"],
    },
    actionButton: {
      borderWidth: 0,
      height: 50,
      marginLeft: 6,
      borderRadius: 5,
    },
    shipmentContainer: {
      marginTop: 20,
      marginBottom: 40,
      backgroundColor: theme["color-basic-900"],
      borderRadius: 10,
      padding: 20,
    },
    shipmentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    actionView: {
      marginTop: 35,
      alignItems: "flex-start",
    },
    portContainer: { width: "45%" },
    portSubheading: {
      fontSize: 12,
      fontWeight: "700",
      color: theme["color-basic-500"],
      marginBottom: 15,
    },
    portSubheadingRight: {
      textAlign: "right",
    },
    portHeading: {},
    portHeadingRight: { textAlign: "right" },
    actionIcon: {
      flex: 1,
      height: 15,
      width: 15,
    },
    shipmentSummary: {
      marginTop: 40,
    },
    amount: {
      fontSize: 25,
      fontWeight: "400",
    },
    timelineContainer: {
      marginVertical: 20,
    },
    contentContainerStyle: {
      flexBasis: "80%",
      // alignSelf: "center",
    },
    iconContainerStyle: {
      marginRight: "10%",
      marginLeft: "0%",
    },
    iconStyle: {
      width: 50,
      height: 50,
      backgroundColor: theme["color-primary-500"],
      color: "#FFF",
      borderColor: "#FFF",
      fontSize: 20,
      paddingTop: Platform.OS === "ios" ? 11 : 15,
      borderRadius: 25,
    },
    timeContainerStyle: {
      flexBasis: "4%",
    },
    addBtn: {
      borderRadius: 100,
      marginBottom: 20,
      borderWidth: 1,
    },
    addBtnIcon: {
      flex: 1,
      height: 25,
      width: 25,
    },
  });
