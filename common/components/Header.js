import React from "react";
import {
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Card,
  Avatar,
} from "@ui-kitten/components";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { currencyData } from "../../api/shipment/shipmentActions";
import { logout } from "../../screens/Auth/auth";
import NetInfo from "@react-native-community/netinfo";
//change start--
const Header = ({
  navigation,
  currencyData,
  scene: { route },
  headerData = {},
}) => {
  const theme = useTheme();
  const { descp = "", title = "" } = headerData;
  const DrawerIcon = (props) => (
    <Icon
      style={styles.drawerIcon}
      {...props}
      fill="#ffffff"
      name="menu-2-outline"
    />
  );

  const EditIcon = (props) => <Icon {...props} name="edit" />;

  const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

  const InfoIcon = (props) => <Icon {...props} name="info" />;

  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [currencies, setCurrencies] = React.useState({});
  const [currentCurrency, setCurrentCurrency] = React.useState({
    curr: "",
    rate: "",
  });
  const [triggerTime, setTriggerTime] = React.useState(0);
  const [currencyIndex, setCurrencyIndex] = React.useState(1);
  const [isInternetConnected, setIsInternetConnected] = React.useState(true);
  // const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 10000,
  //   }).start();
  // }, [fadeAnim]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const handleLogout = async () => {
    const status = await logout();
    navigation.navigate("AuthNavigation", {
      screen: "Login",
    });
  };

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsInternetConnected(state.isConnected);
      !state.isConnected
        ? console.log("You are disconnected with Internet ")
        : null;
    });

    return () => unsubscribe();
  }, []);

  const internetDisconnectBedge = () => {
    return (
      <Card
        style={{
          maxWidth: 230,
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          paddingLeft: 5,
          backgroundColor: theme["color-danger-800"],
          borderColor: "transparent",
          height: 25,
          // opacity: fadeAnim,
        }}
      >
        <Text>No Internet Connected</Text>
      </Card>
    );
  };
  const renderCurrencyBedge = () => {
    return title == "Dashboard" &&
      currentCurrency &&
      currentCurrency.rate != undefined &&
      !isNaN(currentCurrency.rate) ? (
      <Card
        style={{
          maxWidth: 135,
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          paddingLeft: 5,
          backgroundColor:
            currencyIndex == 1
              ? theme["color-basic-400"]
              : currencyIndex == 2
              ? theme["color-warning-400"]
              : currencyIndex == 3
              ? theme["color-success-400"]
              : theme["color-basic-400"],
          borderColor: "transparent",
          height: 25,
          // opacity: fadeAnim,
        }}
        onPress={() => navigation.navigate("CurrencyDetails")}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "red",
          }}
        >
          <>
            <View style={{ flex: 1.6 }}>
              {/* <Avatar
              style={{ width: 35, height: 25 }}
              size="tiny"
              source={{
                uri: "https://www.crwflags.com/fotw/images/i/in_v1.gif",
              }}
            /> */}
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 22,
                  color: theme["color-danger-900"],
                }}
              >
                {`(1 USD -> ${currentCurrency.curr})`}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 22,
                  color: theme["color-danger-900"],
                }}
              >
                {" " + currentCurrency.rate}
              </Text>
            </View>
          </>
        </View>
      </Card>
    ) : (
      <></>
    );
  };
  const renderRightActions = () => (
    <React.Fragment>
      {!isInternetConnected ? internetDisconnectBedge() : renderCurrencyBedge()}
    </React.Fragment>
  );

  // console.log("---curent ", currentCurrency);
  React.useEffect(() => {
    // setInterval(
    //   () =>
    //     currencyData((curr) => {
    //       console.log(curr);
    //       if (curr) {
    //         setCurrencies({
    //           1: curr?.USD_INR,
    //           2: curr?.USD_AED,
    //           3: curr?.USD_AFN,
    //           4: curr?.USD_ALL,
    //         });
    //       }
    //     }),
    //   3600000
    // );

    setCurrentCurrency({
      curr:
        currencyIndex == 1
          ? "INR"
          : currencyIndex == 2
          ? "AFD"
          : currencyIndex == 3
          ? "AFN"
          : "ALL",
      rate: parseFloat(currencies[currencyIndex.toString()]).toFixed(2),
    });
  }, [currencies]);

  React.useEffect(() => {
    currencyData({}, (curr) => {
      if (curr) {
        setCurrencies({
          1: curr?.USD_INR,
          2: curr?.USD_AED,
          3: curr?.USD_AFN,
          4: curr?.USD_ALL,
        });
      }
    });
  }, []);
  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={DrawerIcon}
      color="white"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  );

  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    const id = setTimeout(() => {
      setCounter(counter + 1);
      // console.log("cou", counter);
      setCurrentCurrency({
        curr:
          currencyIndex == 1
            ? "INR"
            : currencyIndex == 2
            ? "AFD"
            : currencyIndex == 3
            ? "AFN"
            : "ALL",
        rate: parseFloat(currencies[currencyIndex.toString()]).toFixed(2),
      });
      //////////
      if (parseInt(currencyIndex) > 3) {
        // console.log("get index 4");
        setCurrencyIndex(1);
      } else {
        setCurrencyIndex(parseInt(currencyIndex) + 1);
        // console.log("less index 4");
      }
    }, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [counter]);
  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme["color-primary-500"],
      height: 60,
    },
    headerBg: {
      backgroundColor: theme["color-primary-500"],
    },
    androidStatusHeight: {
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    },
    title: {
      color: "white",
    },
    subtitle: {
      color: "#e5e5e5",
      fontSize: 12,
    },
  });

  return (
    <View style={styles.headerBg} color="prmary">
      <SafeAreaView style={styles.androidStatusHeight}>
        <TopNavigation
          alignment="center"
          title={() => <Text style={styles.title}>{title}</Text>}
          subtitle={() =>
            descp && descp.length > 1 ? (
              <Text style={styles.subtitle}>{descp}</Text>
            ) : (
              <></>
            )
          }
          accessoryLeft={renderDrawerAction}
          accessoryRight={renderRightActions}
          style={styles.header}
        />
      </SafeAreaView>
    </View>
  );
};

export default connect(null, { currencyData })(Header);
