import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Notifications from "../../screens/Notifications";
import Header from "../../common/components/Header";

const Stack = createStackNavigator();

const NotificationNav = ({ headerData, handleHeader }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    mainBg: {
      flex: 1,
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
      <Stack.Screen name="Notification">
        {(props) => (
          <View style={styles.mainBg}>
            <Notifications {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NotificationNav;
