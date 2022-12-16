import { Avatar, Icon, Text, Button, useTheme } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { TouchableOpacity, View, Linking } from "react-native";
import moment from "moment";

import Timeline from "../../common/components/Timeline";
import design from "./ShipmentEntry/design";
import { getCurrentUser } from "../../api/user/userActions";
import { connect } from "react-redux";

const ShipmentEntry = ({
  shipment,
  navigation,
  clientData,
  getCurrentUser,
}) => {
  const theme = useTheme();
  const styles = design(theme);
  const {
    country,
    destinationPort,
    sourceCountry,
    sourcePort,
    client,
    brand,
    date,
    pi,
  } = shipment;

  const [role, setRole] = React.useState("");
  React.useEffect(() => {
    getCurrentUser({}, (currentUser) => {
      setRole(currentUser && currentUser.user.role);
      // console.log("user--", currentUser.user);
      // console.log(role, "user--", currentUser.user);
    });
  }, []);

  const data = [
    {
      title: {
        content: sourcePort + ", " + sourceCountry,
      },
      time: {
        content: moment(shipment && shipment.date)
          .format("MMM DD, YY")
          .toString(),
        style: {
          textAlign: "right",
          fontSize: 10,
        },
      },
      icon: {
        content: "home",
      },
    },
    {
      title: {
        content: destinationPort + ", " + country,
      },
      time: {
        content: "N/A", //moment(date).format("MMM DD, YY").toString(),
        style: {
          textAlign: "right",
          fontSize: 10,
        },
      },
      icon: {
        content: "location-arrow",
        lineStyle: {
          width: 0,
        },
      },
    },
  ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Shipment", { pi: shipment.pi, role })}
    >
      <View style={styles.container} disabled={true} appearance="filled">
        <View style={styles.row}>
          <Avatar
            source={require("../../assets/download.jpg")}
            style={styles.avatar}
          />

          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {clientData &&
                (clientData.fname + " " + clientData.lname).substring(0, 15) +
                  ((clientData.fname + " " + clientData.lname).length > 15
                    ? "..."
                    : "")}
            </Text>

            <Text style={[styles.company, { color: "gray" }]}>
              {clientData && clientData.company}
            </Text>
          </View>

          {/* <Text style={styles.amount}>{"$" + quantity * rate}</Text> */}
        </View>

        <View style={styles.row}>
          <Timeline
            data={data}
            contentContainerStyle={styles.contentContainerStyle}
            eventStyle={styles.eventStyle}
            timeContainerStyle={styles.timeContainerStyle}
            iconContainerStyle={styles.iconContainerStyle}
          />
        </View>

        <View style={[styles.row, { paddingVertical: 0 }]}>
          <Icon
            style={[styles.footerIcon, { width: 25, height: 25 }]}
            fill={theme["color-basic-800"]}
            name="archive-outline"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13 }}>
              {shipment && shipment.stage + 1} of 7 tasks done
            </Text>
            <Text style={{ color: "gray", fontSize: 10 }} category="label">
              PI- {shipment && shipment.pi}
            </Text>
          </View>

          <Button
            style={styles.actionButton}
            status="basic"
            onPress={() =>
              Linking.openURL(
                "mailto:support.biel@biel.com?subject=biel support"
              )
            }
            // title="support@example.com"
            accessoryLeft={(props) => <Icon {...props} name="email" />}
          />

          {/* <Button
            style={styles.actionButton}
            status="basic"
            accessoryLeft={(props) => <Icon {...props} name="phone" />}
          /> */}
        </View>
        {/* <Text
          style={{ marginLeft: 4, marginTop: -12, color: "gray" }}
          category="label"
        >
          PI- 45678
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default connect(null, { getCurrentUser })(ShipmentEntry);
