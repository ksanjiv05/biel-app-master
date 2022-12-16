import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Text,
  Button,
  Icon,
  Layout,
  Popover,
  Avatar,
} from "@ui-kitten/components";
import moment from "moment";

const ShipmentCard = ({ shipmentData, styles, navigation }) => {
  const {
    country = "N/A",
    destinationPort = "N/A",
    quantity = 0,
    rate = 0,
    sourceCountry = "",
    sourcePort = "",
  } = shipmentData;

  // console.log("shipmenbn", shipmentData);
  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Button status="primary" onPress={() => setVisible(true)}>
      Details
    </Button>
  );

  return (
    <>
      <Text category="h5">Shipment</Text>
      <TouchableOpacity
        style={styles.shipmentContainer}
        onPress={() =>
          navigation.navigate("ShipmentNav", {
            screen: "OrderDetails",
            params: { shipmentData },
          })
        }
      >
        <View style={styles.shipmentRow}>
          <Text status="control">
            {moment(shipmentData && shipmentData.date).format("MMM Do YYYY")}
          </Text>
          <Button
            status="primary"
            onPress={() =>
              navigation.navigate("ShipmentNav", {
                screen: "OrderDetails",
                params: { shipmentData },
              })
            }
          >
            Details
          </Button>
          {/* <Popover
            backdropStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            visible={visible}
            anchor={renderToggleButton}
            onBackdropPress={() => setVisible(false)}
          >
            <Layout>
              <View
                style={{
                  flex: 1,
                  height: 100,
                  backgroundColor: "red",
                  margin: 10,
                }}
              >
                <Text>Welcome to UI Kitten 😻</Text>
              </View>
            </Layout>
          </Popover> */}
        </View>
        <View style={[styles.shipmentRow, styles.actionView]}>
          <View style={styles.portContainer}>
            <Text style={styles.portSubheading} status="control">
              {sourcePort}
            </Text>
            <Text style={styles.portHeading} status="control">
              {sourceCountry}
            </Text>
          </View>
          <Icon style={styles.actionIcon} fill="white" name="swap-outline" />
          <View style={styles.portContainer}>
            <Text
              style={[styles.portSubheading, styles.portSubheadingRight]}
              status="control"
            >
              {destinationPort}
            </Text>
            <Text
              style={[styles.portHeading, styles.portHeadingRight]}
              status="control"
            >
              {country}
            </Text>
          </View>
        </View>
        {/* <View style={[styles.shipmentRow, styles.shipmentSummary]}>
          <Text status="control">Total</Text>
          <Text status="warning" style={styles.amount}>
            {"$" + quantity * rate}
          </Text>
        </View> */}
      </TouchableOpacity>
    </>
  );
};

export default ShipmentCard;
