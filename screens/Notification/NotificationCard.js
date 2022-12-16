import React from "react";
import {
  Button,
  Icon,
  Card,
  ListItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import moment from "moment";

const renderItemIcon = (props) => (
  <View style={{ marginTop: 1 }}>
    <Icon {...props} name="bell-outline" />
  </View>
);
export default function NotificationCard({
  styles,
  title,
  message,
  createdAt,
}) {
  // const day = cdate.diff(d2, "day");
  // const h = cdate.diff(d2, "hour");
  // const m = cdate.diff(d2, "minute");
  // const s = cdate.diff(d2, "second");

  const getTime = () => {
    const today = moment(Date.now());
    const notificationCraeted = moment(createdAt);
    const days = today.diff(notificationCraeted, "day");
    if (days > 0) {
      return moment(createdAt).format("dd-mm-yyyy");
    } else {
      return moment(createdAt).fromNow();
    }
    // const dayx = Math.floor(s / 60 / 60 / 24);
    // const ho = Math.floor((s / 60 / 60) % 24);
    // const mo = Math.floor(((s / 60) % 60) % 24);
    // const mso = Math.floor(((s % 60) % 60) % 24);
    // console.log("from now", dayx, "day", ho, "hours", mo, "min", mso, "sec");
  };

  return (
    <Card style={{ borderWidth: 0, marginVertical: 5 }}>
      <ListItem
        title={(evaProps) => <Text style={styles.title}>{title}</Text>}
        description={message}
        accessoryLeft={renderItemIcon}

        // accessoryRight={InstallButton}
      />
      <View style={styles.timeContainer}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 20, display: "flex" }}>
            <Icon style={styles.icon} fill="#8F9BB3" name="clock-outline" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.time}> {getTime()}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
