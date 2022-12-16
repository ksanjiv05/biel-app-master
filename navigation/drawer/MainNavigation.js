import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

import BottomNav from "../bottomTabs/BottomNav";
import ShipmentNav from "../stacks/ShipmentNav";
import NewsArticleNav from "../stacks/NewsArticleNav";
import UserNav from "../stacks/UserNav";
import AuthNav from "../auth/AuthNavigation";
import DrawerMenu from "../../screens/DrawerMenu";
import { connect } from "react-redux"; //
import PriceListNav from "../stacks/PriceListNav";

// import { getCurrentUser } from "../../api/user/userActions"; //

const Drawer = createDrawerNavigator();

const MainNavigator = ({ isAuth }) => {
  const [headerData, setheaderData] = React.useState({
    title: "",
    descp: "",
  });

  const handleHeader = (title, descp) => {
    setheaderData({
      title,
      descp,
    });
  };

  return (
    <SafeAreaProvider>
      <Drawer.Navigator
        initialRouteName="Menu"
        drawerContent={(props) => (
          <DrawerMenu
            {...props}
            handleHeader={handleHeader}
            headerData={headerData}
          />
        )}
      >
        <Drawer.Screen name="Menu">
          {() => (
            <BottomNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="ShipmentNav">
          {() => (
            <ShipmentNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="UserNav">
          {() => (
            <UserNav handleHeader={handleHeader} headerData={headerData} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="NewsArticleNav">
          {() => (
            <NewsArticleNav
              handleHeader={handleHeader}
              headerData={headerData}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="PriceListNav">
          {() => (
            <PriceListNav
              handleHeader={handleHeader}
              headerData={headerData}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="AuthNav">{() => <AuthNav />}</Drawer.Screen>
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
