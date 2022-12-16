import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import ChangePassword from "../../screens/ChangePassword";
import MainNavigator from "../drawer/MainNavigation";
import ResetPassword from "../../screens/ResetPassword";
import { UserContext } from "../../App";

const Stack = createStackNavigator();

function AuthNavigation() {
  console.log("i am called");
  const { activeUser } = React.useContext(UserContext);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reset" component={ResetPassword} />
        <Stack.Screen name="ChangePass" component={ChangePassword} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </>
  );
}

export default AuthNavigation;
