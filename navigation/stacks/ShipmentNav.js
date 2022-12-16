import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import AddShipment from "../../screens/AddShipment";
import AddClient from "../../screens/AddClient";
import Header from "../../common/components/Header";
import PackagingMatrialStatus from "../../screens/AddShipment/Forms/1_PackagingMatrialStatus";

import ProductionSchedule from "../../screens/AddShipment/Forms/3_ProductionSchedule";
import DocumentStatus from "../../screens/AddShipment/Forms/4_DocumentStatus";
import ShipmentSchedule from "../../screens/AddShipment/Forms/5_ShipmentSchedule";
import DocumentDispatchStatus from "../../screens/AddShipment/Forms/6_DocumentDispatchStatus";
import OrderDetails from "../../screens/Shipment/OrderDetails";
import UpdateSchedule from "../../screens/AddShipment/Forms/2_UpdateSchedule";
import Schedule from "../../screens/AddShipment/Forms/2_UpdateSchedule/Schedule";

const Stack = createStackNavigator();

const ShipmentNav = ({ headerData, handleHeader }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    mainBg: {
      flex: 1,
      backgroundColor: theme["color-primary-500"],
    },
  });

  return (
    <Stack.Navigator
      style={styles.mainBg}
      mode="modal"
      screenOptions={{
        header: (props) => <Header headerData={headerData} {...props} />,
      }}
      headerMode="float"
    >
      <Stack.Screen name="AddShipment">
        {(props) => (
          <View style={styles.mainBg}>
            <AddShipment handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="AddClient">
        {(props) => (
          <View style={styles.mainBg}>
            <AddClient handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="PackagingMatrialStatus">
        {(props) => (
          <View style={styles.mainBg}>
            <PackagingMatrialStatus handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Schedule">
        {(props) => (
          <View style={styles.mainBg}>
            <UpdateSchedule handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductionSchedule">
        {(props) => (
          <View style={styles.mainBg}>
            <ProductionSchedule handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="DocumentStatus">
        {(props) => (
          <View style={styles.mainBg}>
            <DocumentStatus handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="ShipmentSchedule">
        {(props) => (
          <View style={styles.mainBg}>
            <ShipmentSchedule handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="DocumentDispatchStatus">
        {(props) => (
          <View style={styles.mainBg}>
            <DocumentDispatchStatus handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="OrderDetails">
        {(props) => (
          <View style={styles.mainBg}>
            <OrderDetails handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="ScheduleForm">
        {(props) => (
          <View style={styles.mainBg}>
            <Schedule handleHeader={handleHeader} {...props} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ShipmentNav;
