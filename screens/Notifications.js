import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationsList from "./Notification/NotificationsList";
import design from "./Notification/design";
import { useTheme, Text, Divider, Spinner } from "@ui-kitten/components";
import { View } from "react-native";
import { connect } from "react-redux";
import { getNotification } from "../api/notification/notificationAction";

const Notifications = ({
  navigation,
  handleHeader,
  getNotification,
  notificationList,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Alerts", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setLoader(true);
    getNotification({ email: "akjbusiness@gmail.com" }, (status) => {
      setLoader(false);
      // console.log("noti list ", notificationList);
    });
  }, []);
  const refreshList = () => {
    console.log("refresh called");
    setLoader(true);
    getNotification({ email: "akjbusiness@gmail.com" }, (status) => {
      setLoader(false);
    });
  };
  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.headerTitle}>
        Notifications{" "}
      </Text>
      {!loader ? (
        <View style={styles.categoryNotification}>
          <Divider style={styles.dividerStyle} />
          <NotificationsList
            styles={styles}
            data={notificationList}
            refreshList={refreshList}
          />
          {/* <NotificationsList styles={styles} />
          <NotificationsList styles={styles} /> */}
        </View>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

const mapStateToProps = ({ notificationApi }) => {
  return {
    notificationList: notificationApi,
  };
};

export default connect(mapStateToProps, { getNotification })(Notifications);
