import {
  Icon,
  useTheme,
  Input,
  Button,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { changePassword } from "../api/user/userActions";
import design from "./Login/design";

const Login = ({ changePassword, user }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = design(insets, theme);

  const [password, setPassword] = React.useState("Butterfly-123#");
  const [repassword, setPasswordRe] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [secureTextEntryRe, setSecureTextEntryRe] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRe = () => {
    setSecureTextEntryRe(!secureTextEntryRe);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderIconRe = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntryRe}>
      <Icon {...props} name={secureTextEntryRe ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const handleChangePassword = () => {
    // setLoading(true);
    // if (password === "") {
    //   setError({ password: true, message: "Password can't be empty." });
    // } else if (!password === repassword) {
    //   setError({ password: true, message: "Password did not match." });
    // } else {
    changePassword({ password }, (status) => {
      console.log("Password changed", status);
    });
    // }
  };

  return (
    <ImageBackground
      style={styles.mainBg}
      source={require("../assets/login_bg.png")}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Input
          style={styles.password}
          status={user.error && user.password ? "danger" : "basic"}
          textStyle={styles.passwordTextStyle}
          value={password}
          placeholder="Password"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(password) => setPassword(password.trim())}
        />
        <Input
          style={styles.password}
          status={user.error && user.password ? "danger" : "basic"}
          textStyle={styles.passwordTextStyle}
          value={repassword}
          placeholder="repassword"
          accessoryRight={renderIconRe}
          secureTextEntry={secureTextEntryRe}
          onChangeText={(repassword) => setPasswordRe(repassword.trim())}
        />

        {user.error && (
          <Text status="danger">
            {(() => {
              loading && setLoading(false);
              return user.message;
            })()}
          </Text>
        )}

        <Button
          style={styles.loginBtn}
          status="danger"
          onPress={() => handleChangePassword()}
        >
          Change Password
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const mapStateToProps = ({ userApi }) => ({
  user: userApi,
});

export default connect(mapStateToProps, { changePassword })(Login);
