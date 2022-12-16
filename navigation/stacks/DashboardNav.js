import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Dashboard from "../../screens/Dashboard";
import Shipment from "../../screens/Shipment";
import Header from "../../common/components/Header";
import { useRoute } from "@react-navigation/native";
import CurrencyDetails from "../../screens/CurrencyDetails";
const Stack = createStackNavigator();

const DashboardNav = ({ headerData, handleHeader }) => {
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
      <Stack.Screen name="Dashboard">
        {(props) => (
          <View style={styles.mainBg}>
            <Dashboard {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Shipment">
        {(props) => (
          <View style={styles.mainBg}>
            <Shipment {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="CurrencyDetails">
        {(props) => (
          <View style={styles.mainBg}>
            <CurrencyDetails {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default DashboardNav;
