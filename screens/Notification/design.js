import { StyleSheet, Platform, StatusBar } from "react-native";

const design = (insets, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 18,
      marginVertical: 10,
      marginBottom: 80,
    },
    notificationListCon: {
      flex: 1,

      overflow: "hidden",
    },
    categoryNotification: {
      flex: 1,
    },
    dividerStyle: {
      marginBottom: 8,
      // width: 200,
    },
    subTitle: {
      color: theme["color-basic-600"],
      justifyContent: "flex-end",
      textAlign: "right",
      marginBottom: 5,
    },
    headerTitle: {
      fontWeight: "bold",
      marginBottom: 10,
    },
    title: { fontWeight: "bold", marginLeft: 6 },
    timeContainer: { marginLeft: 52, height: 25 },
    time: {
      color: theme["color-basic-400"],
      fontSize: 12,
      display: "flex",
      marginBottom: 10,
      // lineHeight: 10,
    },
    icon: {
      width: 18,
      height: 18,
    },
  });

export default design;
