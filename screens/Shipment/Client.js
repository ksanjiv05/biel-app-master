import React from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Avatar, Text, Button, Icon } from "@ui-kitten/components";

const Client = ({ navigation, styles, users = null, shipmentData = null }) => {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    users &&
      users.map((user) => {
        if (user.email == shipmentData?.client) {
          setClient(user);
        }
      });
    return () => setClient(null);
  }, [users]);
  return (
    client && (
      <>
        <Text category="h5">Tracking</Text>
        <TouchableOpacity
          style={styles.clientContainer}
          onPress={() => navigation.navigate("Shipment")}
        >
          <Avatar
            source={require("../../assets/download.jpg")}
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.clientLabel}>Client</Text>
            <Text category="s1">{client.fname}</Text>
            <Text style={{ fontSize: 10 }} category="c2">
              {client.company}
            </Text>
          </View>
          <Button
            style={styles.actionButton}
            status="basic"
            accessoryLeft={(props) => <Icon {...props} name="email" />}
          ></Button>
          {/* <Button
          style={styles.actionButton}
          status="basic"
          accessoryLeft={(props) => <Icon {...props} name="phone" />}
        ></Button> */}
        </TouchableOpacity>
      </>
    )
  );
};

export default Client;
