import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import ViewUsers from "../../screens/ViewUsers";
import EditUserDetails from "../../screens/EditUserDetails";

import Header from "../../common/components/Header";

const Stack = createStackNavigator();

const UserNav = ({ headerData, handleHeader }) => {
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
      <Stack.Screen name="ViewUsers">
        {(props) => (
          <View style={styles.mainBg}>
            <ViewUsers {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="EditDetails">
        {(props) => (
          <View
            style={[
              styles.mainBg,
              { backgroundColor: theme["color-primary-500"] },
            ]}
          >
            <EditUserDetails {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default UserNav;
