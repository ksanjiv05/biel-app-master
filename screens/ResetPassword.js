import { useTheme, Input, Button, Text, Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { resetPassword } from "../api/user/userActions";
import design from "./Login/design";

const ResetPassword = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = design(insets, theme);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleResetPassword = () => {
    setLoading(true);
    const emailRgx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (email === "") {
      setError({ email: "Email Id can't be empty." });
      setLoading(false);
      return;
    }
    if (email.length > 5) {
      const stx = emailRgx.test(email);
      if (!stx) {
        setError({
          email: "Email not valid",
        });
        setLoading(false);
        return;
      }
    }

    resetPassword({ email }, (status) => {
      if (status) {
        console.log("reset password link sended to your email");
        showToast("Reset password link sended to your email");
        navigation.navigate("Login");
      } else console.log("please enter registred email");
      setLoading(false);
    });
  };

  return (
    <ImageBackground
      style={styles.mainBg}
      source={require("../assets/login_bg.png")}
    >
      {/* <FancyAlert
        visible={visible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 50,
              padding: 0,
              width: "100%",
            }}
          >
            <Text
              onPress={() => setVisible(false)}
              style={{ color: "white", fontSize: 20 }}
            >
              X
            </Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 32,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          
        </Text>
      </FancyAlert> */}

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: Dimensions.get("screen").height,
              justifyContent: "flex-end",
            }}
          >
            <Input
              style={styles.password}
              textStyle={styles.passwordTextStyle}
              value={email}
              placeholder="Enter the email"
              onChangeText={(email) => setEmail(email.trim())}
            />
            <Text style={styles.errorMsg}>{error}</Text>
            <Button
              style={styles.signupTxt}
              status="danger"
              onPress={() => handleResetPassword()}
            >
              {!loading ? "Reset Password" : <Spinner />}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPassword;
