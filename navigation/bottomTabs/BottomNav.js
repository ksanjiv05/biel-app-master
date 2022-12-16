import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Layout, Icon, Text, useTheme, Button } from "@ui-kitten/components";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DashboardNav from "../stacks/DashboardNav";
import NewsNav from "../stacks/NewsNav";
import Search from "../../screens/Search";
import SearchNav from "../stacks/SearchNav";
import Notifications from "../../screens/Notifications";
import design from "./BottomNav/design";
import FabButton from "./BottomNav/FabButton";
import NotificationNav from "../stacks/NotificationNav";
import { connect } from "react-redux";
import { getCurrentUser } from "../../api/user/userActions";

const Tab = createBottomTabNavigator();

const BottomNav = ({ handleHeader, headerData, getCurrentUser }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = design(insets, theme);
  const PlusIcon = <Icon name="plus" style={styles.plusIcon} fill="white" />;
  const tabOptions = (route, focused) => {
    const icons = {
      HOME: "home",
      NEWS: "tv",
      SEARCH: "search",
      ALERTS: "bell",
    };

    return (
      <View style={styles.optionsContainer}>
        <Icon
          style={styles.icons}
          name={icons[route.name]}
          fill={focused ? theme["color-primary-500"] : theme["color-basic-600"]}
        />
        <Text
          style={[
            styles.text,
            {
              color: focused
                ? theme["color-primary-500"]
                : theme["color-basic-600"],
            },
          ]}
        >
          {route.name}
        </Text>
      </View>
    );
  };

  const [role, setRole] = React.useState("");
  React.useEffect(() => {
    // console.log("i am run drawer ",navigation.isFocused)
    getCurrentUser({}, (currentUser) => {
      setRole(currentUser && currentUser.user.role);
      // console.log(isAdmin,"user--",currentUser.user);
    });
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => tabOptions(route, focused),
        })}
        tabBarOptions={{
          showLabel: false,
          style: styles.footer,
        }}
      >
        <Tab.Screen name="HOME">
          {() => (
            <DashboardNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Tab.Screen>
        <Tab.Screen name="NEWS">
          {() => (
            <NewsNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Tab.Screen>
        {role == "Admin" ? (
          <Tab.Screen
            name="Add"
            options={{
              tabBarIcon: () => (
                <Button
                  // styles={styles}
                  style={[
                    styles.button,
                    { borderRadius: 200, width: 80, height: 80 },
                  ]}
                  status="danger"
                  accessoryLeft={() => PlusIcon}
                  onPress={() => {
                    navigation.navigate("ShipmentNav", {
                      screen: "AddShipment",
                      params: { pi: "" },
                    });
                  }}
                ></Button>
              ),
            }}
          >
            {() => <></>}
          </Tab.Screen>
        ) : (
          <></>
        )}

        <Tab.Screen name="SEARCH">
          {() => (
            <SearchNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Tab.Screen>
        <Tab.Screen name="ALERTS">
          {() => (
            <NotificationNav
              handleHeader={handleHeader}
              headerData={headerData}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Layout>
  );
};

// export default ;
export default connect(null, { getCurrentUser })(BottomNav);
