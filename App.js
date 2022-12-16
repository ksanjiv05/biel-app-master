import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
// import { connect } from "react-redux";
import { enableScreens } from "react-native-screens";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import MainNavigation from "./navigation/drawer/MainNavigation";
import AuthNavigation from "./navigation/auth/AuthNavigation";

import configureStore from "./api";
import { isAuthanticate, getCurrentUserX } from "./api/user/userActions";

import { default as theme } from "./config/theme.json";
import { default as mapping } from "./config/mapping.json";
// import { getValueFromStore, isAuthanticate } from "./screens/Auth/auth";
//push nptificarion
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { BackHandler, View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { LogBox } from "react-native";
import { saveToken } from "./api/notification/notificationAction";
import * as SecureStore from "expo-secure-store";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

LogBox.ignoreAllLogs(true);

export const UserContext = React.createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

///
Sentry.init({
  dsn: "https://9efe3d42735f4491a311ab38701ae224@o4504337745707008.ingest.sentry.io/4504338024628224",
  tracesSampleRate: 0.1,
  // enableNative: true,
  enableInExpoDevelopment: true,
  debug: true // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});
// Sentry.Native.setContext(Constants.manifest.revisionId);

enableScreens();
const api = configureStore();

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isInternetConnected, setIsInternetConnected] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  const [expoPushToken, setExpoPushToken] = React.useState("");
  React.useEffect(() => {
    // try {
    //   const x = Math.co("yyy");
    // } catch (error) {
    //   Sentry.Native.captureException(error);
    //   Sentry.Native.captureException("test error")
    //   throw new Error(error);
    // }
    setLoader(true);

    async function checkAuth() {
      // const token = await getValueFromStore("token");
      // setIsAuth(isAuthanticate(token));
      await getCurrentUserX({}, (currentUser) => {
        if (currentUser) {
          console.log(
            "username ",
            currentUser.user.email,
            currentUser.user.role
          );
          setIsAdmin(currentUser && currentUser.user.role == "Admin");
          setActiveUser(currentUser && currentUser.user);
        } else {
          console.log("user auth fail ", currentUser);
          setLoader(false);
        }
      });

      await isAuthanticate({}, (status) => {
        console.log("isAuth atatus", status);
        setIsAuth(status);
        setLoader(false);
      });
    }
    checkAuth();
    return () => setActiveUser(null);
  }, []);

  const getActiveUser = async () => {
    console.log("call active user");
    await getCurrentUserX({}, (currentUser) => {
      setIsAdmin(currentUser && currentUser.user.role == "Admin");
      setActiveUser(currentUser && currentUser.user);
    });
  };

  //push notifications
  React.useEffect(() => {
    getPushNotificationPermissions();

    Notifications.addNotificationReceivedListener(_handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  });

  const _handleNotification = (notification) => {
    console.log("noti++++++++", notification.request.content.title);
    if (
      notification.request.content.title === "Your account password changed"
    ) {
      setTimeout(async () => {
        alert("Your account password changed please login ");
        await SecureStore.setItemAsync("token", "");

        BackHandler.exitApp();
      }, 1500);
    }
  };

  const _handleNotificationResponse = (response) => {
    console.log("res", response);
  };
  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.log(" existingStatus", existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getDevicePushTokenAsync()).data; //(await Notifications.getExpoPushTokenAsync()).data; // (await Notifications.getDevicePushTokenAsync()).data; //(await Notifications.getExpoPushTokenAsync()).data;
    console.log("wait for token ", token);
    setExpoPushToken(token);
    saveToken({ token }, (status) => {
      console.log("app js token status =", status);
    });
    // this.setState({ expoPushToken: token });
  };

  return (
    <Provider store={api}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <NavigationContainer>
          <StatusBar style="auto" />

          <UserContext.Provider
            value={{
              getActiveUser: getActiveUser,
              activeUser: activeUser,
              isAdminX: isAdmin,
            }}
          >
            {
              // !isInternetConnected ? (
              //   <ImageBackground
              //     style={{ flex: 1 }}
              //     source={require("./assets/inter.png")}
              //   ></ImageBackground>
              // ) :
              loader ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>Loading....</Text>
                </View>
              ) : isAuth ? (
                <MainNavigation isAuth={isAuth} />
              ) : (
                <AuthNavigation />
                // <MainNavigation isAuth={isAuth} />
              )
            }
          </UserContext.Provider>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
export default Sentry.Native.wrap(App);

// export default connect(null, { saveToken })(App);
//TODO:
// pull to refresh
// create error redux store for all
// change forms ui to match zoho forms design.
// add animations
// create display cards for each form data display...such that input and view ui matches to save extraa component creation
