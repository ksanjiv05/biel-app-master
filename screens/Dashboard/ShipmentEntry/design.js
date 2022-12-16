import { StyleSheet } from "react-native";

const design = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 18,
      marginVertical: 15,
      borderRadius: 10,
      borderLeftColor:
        theme[
          (() => {
            let colors = [
              "color-success-500",
              "color-primary-500",
              "color-info-500",
              "color-warning-500",
              "color-danger-500",
            ];
            return colors[Math.floor(Math.random() * colors.length)];
          })()
        ],
      borderLeftWidth: 8, //dynamic
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    avatar: {
      flex: 1,
      borderRadius: 10,
      height: 50,
      width: 50,
    },
    nameContainer: {
      flex: 3,
      marginHorizontal: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: "500",
    },
    company: {
      fontSize: 12,
      color: theme["color-basic-600"],
    },
    amount: {
      fontWeight: "600",
      fontSize: 20,
      justifyContent: "flex-end",
    },
    contentContainerStyle: {
      flexBasis: "55%",
      alignItems: "flex-start",
      backgroundColor: "rgba(255,255,255,0)",
      padding: 0,
      borderRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: "rgba(255,255,255,0)",
      shadowOpacity: 0,
      borderTopLeftRadius: 0,
    },
    eventStyle: {
      marginVertical: 0,
    },
    timeContainerStyle: {
      flexBasis: "18%",
      marginTop: 2.5,
    },
    iconContainerStyle: {
      marginRight: "5%",
      marginLeft: "2%",
    },
    footerIcon: { width: 20, height: 20, flex: 1, marginRight: 8 },
    footerText: {
      flex: 3,
    },
    actionButton: {
      borderWidth: 0,
      height: 50,
      marginLeft: 6,
      borderRadius: 5,
    },
  });

export default design;
