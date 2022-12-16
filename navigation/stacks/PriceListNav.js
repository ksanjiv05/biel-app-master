import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Header from "../../common/components/Header";
import PriceList from "../../screens/PriceList";
import AddProduct from "../../screens/AddProduct";
import PackagingList from "../../screens/PackagingList";
import AddPackaging from "../../screens/AddPackaging";

const Stack = createStackNavigator();

const PriceListNav = ({ headerData, handleHeader }) => {
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
      
      <Stack.Screen name="PriceList">
        {(props) => (
          <View style={styles.mainBg}>
            <PriceList {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>

			<Stack.Screen name="AddProduct">
        {(props) => (
          <View style={styles.mainBg}>
            <AddProduct {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="PackagingList">
        {(props) => (
          <View style={styles.mainBg}>
            <PackagingList {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="AddPackaging">
        {(props) => (
          <View style={styles.mainBg}>
            <AddPackaging {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PriceListNav;
