// import {
//   Icon,
//   useTheme,
//   Input,
//   Button,
//   Text,
//   Spinner,
// } from "@ui-kitten/components";
// import { connect } from "react-redux";
// import React from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   TouchableWithoutFeedback,
//   ImageBackground,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   ScrollView,
//   View,
//   Dimensions,
//   Keyboard,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { UserContext } from "../App";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { FancyAlert } from "react-native-expo-fancy-alerts";
// import { login, register, setError } from "../api/user/userActions";

// import design from "./Login/design";

// const Login = ({ login, register, user }) => {
//   const theme = useTheme();
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();
//   const styles = design(insets, theme);

//   const [signup, setSignUp] = React.useState(false);
//   const [error, setError] = React.useState({
//     name: "",
//     email: "",
//     password: "",
//     repassword: "",
//   });
//   const [password, setPassword] = React.useState("");
//   const [repassword, setPasswordRe] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [secureTextEntry, setSecureTextEntry] = React.useState(true);
//   const [secureTextEntryRe, setSecureTextEntryRe] = React.useState(true);
//   const [loading, setLoading] = React.useState(false);
//   const { getActiveUser } = React.useContext(UserContext);
//   const [serverError, setServerError] = React.useState(
//     "Bad Creadantial OR Server Unavailable !"
//   );
//   // useEffect(() => {
//   //   if (user && user.status === 200 && signup && user.isLogin) {
//   //     toggleSignUp(!signup);
//   //     setLoading(false);
//   //   } else if (user && user.status === 200 && !signup && user.isLogin) {
//   //     getActiveUser();
//   //     navigation.navigate("Main");
//   //     setLoading(false);
//   //   }
//   // }, [user]);
//   const [visible, setVisible] = React.useState(false);
//   // const toggleAlert = React.useCallback(() => {
//   //   setVisible(!visible);
//   // }, [visible]);

//   const toggleSecureEntry = () => {
//     setSecureTextEntry(!secureTextEntry);
//   };

//   const toggleSecureEntryRe = () => {
//     setSecureTextEntryRe(!secureTextEntryRe);
//   };

//   const toggleSignUp = () => {
//     setSignUp(!signup);
//     setError({
//       name: "",
//       email: "",
//       password: "",
//       repassword: "",
//     });
//     setName("");
//     setPassword("");
//     setPasswordRe("");
//   };

//   const renderIcon = (props) => (
//     <TouchableWithoutFeedback onPress={toggleSecureEntry}>
//       <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
//     </TouchableWithoutFeedback>
//   );

//   const renderIconRe = (props) => (
//     <TouchableWithoutFeedback onPress={toggleSecureEntryRe}>
//       <Icon {...props} name={secureTextEntryRe ? "eye-off" : "eye"} />
//     </TouchableWithoutFeedback>
//   );

//   const handleLogin = () => {
//     setLoading(true);
//     setError({
//       name: "",
//       email: "",
//       password: "",
//       repqssword: "",
//     });
//     if (email === "") {
//       setError({ email: "Email Id can't be empty." });
//       setLoading(false);
//       return;
//     } else if (password === "") {
//       setError({ password: "Password can't be empty." });
//       setLoading(false);
//       return;
//     } else {
//       const creds = { password, email };
//       login(creds, (status) => {
//         if (status) {
//           getActiveUser();
//           // toggleSignUp(!signup);

//           navigation.navigate("Main");
//           setLoading(false);
//         } else {
//           // alert("Bad records!");
//           setServerError("Bad Creadantial OR Server Unavailable !");
//           setVisible(true);
//           setLoading(false);
//         }
//       });
//     }
//   };

//   const handleRegister = () => {
//     setError({
//       name: "",
//       email: "",
//       password: "",
//       repqssword: "",
//     });
//     setLoading(true);
//     console.log("i am call");
//     const psregx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
//     const emailRgx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
//     if (name === "") {
//       setError({ name: "Name can't be empty." });
//       setLoading(false);
//       return;
//     } else if (email === "") {
//       setError({ email: "Email Id can't be empty." });
//       setLoading(false);
//       return;
//     }
//     if (email.length > 5) {
//       const stx = emailRgx.test(email);
//       if (!stx) {
//         setError({
//           email: "Email not valid",
//         });
//         setLoading(false);
//         return;
//       }
//       setLoading(false);
//     }

//     if (password === "") {
//       setError({ password: "Password can't be empty." });
//       setLoading(false);
//       return;
//     }
//     if (password.length > 5) {
//       const st = psregx.test(password);
//       console.log("pass test", st);
//       if (!st) {
//         setError({
//           password:
//             "Password contains at least 1 Capital, 1 Numer, 1 Special Char ",
//         });
//         setLoading(false);
//         return;
//       }
//       setLoading(false);
//     }
//     if (repassword === "") {
//       setError({ repassword: "Passwords doesn't match." });
//       setLoading(false);
//       return;
//     } else if (password !== repassword) {
//       setError({ repassword: "Passwords doesn't match." });
//       setLoading(false);
//       return;
//     } else {
//       setLoading(true);
//       const creds = { name: name.trim(), email, password, repassword };
//       register(creds, (status) => {
//         if (status) {
//           getActiveUser();
//           setLoading(false);
//           toggleSignUp(!signup);

//           // navigation.navigate("Main");
//         } else {
//           setServerError("Email already exist OR Server Unavailable !");
//           setVisible(true);
//           setLoading(false);
//         }
//       });
//     }
//   };

//   return (
//     <ImageBackground
//       style={styles.mainBg}
//       source={require("../assets/login_bg.png")}
//     >
//       <FancyAlert
//         visible={visible}
//         icon={
//           <View
//             style={{
//               flex: 1,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "red",
//               borderRadius: 50,
//               padding: 0,
//               width: "100%",
//             }}
//           >
//             <Text
//               onPress={() => setVisible(false)}
//               style={{ color: "white", fontSize: 20 }}
//             >
//               X
//             </Text>
//           </View>
//         }
//         style={{ backgroundColor: "white" }}
//       >
//         <Text
//           style={{
//             marginTop: -16,
//             marginBottom: 32,
//             fontSize: 12,
//             textAlign: "center",
//           }}
//         >
//           {serverError}
//         </Text>
//       </FancyAlert>
//       <KeyboardAwareScrollView
//         scrollEnabled={true}
//         style={styles.container}
//         enableAutomaticScroll={true}
//         // extraScrollHeight={455}
//       >
//         <View
//           style={{
//             justifyContent: "flex-end",
//             // position: "relative",
//             backgroundColor: "red",
//             height: Dimensions.get("window").height,
//             // paddingBottom:Keyboard.
//           }}
//         >
//           {/* <KeyboardAvoidingView behavior="height" style={styles.container}> */}
//           {signup && (
//             <>
//               <Input
//                 style={styles.username}
//                 status={user.error && user.name ? "danger" : "basic"}
//                 textStyle={styles.usernameTextStyle}
//                 value={name}
//                 placeholder="Full Name"
//                 onChangeText={(name) => setName(name)}
//               />
//               <Text style={styles.errorMsg}>{error && error?.name}</Text>
//             </>
//           )}
//           <Input
//             style={styles.username}
//             status={user.error && user.email ? "danger" : "basic"}
//             textStyle={styles.usernameTextStyle}
//             value={email}
//             placeholder="Email"
//             onChangeText={(email) => setEmail(email.trim())}
//           />
//           <Text style={styles.errorMsg}>{error && error?.email}</Text>
//           <Input
//             style={styles.password}
//             status={user.error && user.password ? "danger" : "basic"}
//             textStyle={styles.passwordTextStyle}
//             value={password}
//             placeholder="Password"
//             accessoryRight={renderIcon}
//             secureTextEntry={secureTextEntry}
//             onChangeText={(password) => setPassword(password.trim())}
//           />
//           <Text style={styles.errorMsg}>{error && error?.password}</Text>
//           {signup && (
//             <>
//               <Input
//                 style={styles.password}
//                 status={user.error && user.repassword ? "danger" : "basic"}
//                 textStyle={styles.passwordTextStyle}
//                 value={repassword}
//                 placeholder="Confirm Password"
//                 accessoryRight={renderIconRe}
//                 secureTextEntry={secureTextEntryRe}
//                 onChangeText={(repassword) => setPasswordRe(repassword.trim())}
//               />
//               <Text style={styles.errorMsg}>{error && error?.repassword}</Text>
//             </>
//           )}

//           {/* {user.error && (
//           <Text status="danger">
//             {(() => {
//               loading && setLoading(false);
//               return user.message;
//             })()}
//           </Text>
//         )} */}

//           <Button
//             style={styles.loginBtn}
//             status="danger"
//             onPress={
//               !loading
//                 ? () => (signup ? handleRegister() : handleLogin())
//                 : null
//             }
//           >
//             {loading ? (
//               <Spinner size="small" status="basic" />
//             ) : !signup ? (
//               "LOGIN"
//             ) : (
//               "SIGN UP"
//             )}
//           </Button>
//           <Button style={styles.signupTxt} onPress={() => toggleSignUp()}>
//             {!signup ? "SIGN UP" : "CANCEL"}
//           </Button>
//         </View>
//       </KeyboardAwareScrollView>
//       {/* </KeyboardAvoidingView> */}
//     </ImageBackground>
//   );
// };

// const mapStateToProps = ({ userApi }) => ({
//   user: userApi,
// });

// export default connect(mapStateToProps, { login, register })(Login);

//-------------------------------------------------------------

import {
  Icon,
  useTheme,
  Input,
  Button,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { FancyAlert } from "react-native-expo-fancy-alerts";
import { login, register, setError } from "../api/user/userActions";

import design from "./Login/design";

const Login = ({ login, register, user }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = design(insets, theme);

  const [signup, setSignUp] = React.useState(false);
  const [error, setError] = React.useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [password, setPassword] = React.useState("");
  const [repassword, setPasswordRe] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [secureTextEntryRe, setSecureTextEntryRe] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { getActiveUser } = React.useContext(UserContext);

  // useEffect(() => {
  //   if (user && user.status === 200 && signup && user.isLogin) {
  //     toggleSignUp(!signup);
  //     setLoading(false);
  //   } else if (user && user.status === 200 && !signup && user.isLogin) {
  //     getActiveUser();
  //     navigation.navigate("Main");
  //     setLoading(false);
  //   }
  // }, [user]);
  const [visible, setVisible] = React.useState(false);
  // const toggleAlert = React.useCallback(() => {
  //   setVisible(!visible);
  // }, [visible]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRe = () => {
    setSecureTextEntryRe(!secureTextEntryRe);
  };

  const toggleSignUp = () => {
    setSignUp(!signup);
    setError({
      name: "",
      email: "",
      password: "",
      repassword: "",
    });
    setName("");
    setPassword("");
    setPasswordRe("");
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

  const handleLogin = () => {
    setLoading(true);
    setError({
      name: "",
      email: "",
      password: "",
      repqssword: "",
    });
    if (email === "") {
      setError({ email: "Email Id can't be empty." });
      setLoading(false);
      return;
    } else if (password === "") {
      setError({ password: "Password can't be empty." });
      setLoading(false);
      return;
    } else {
      const creds = { password, email };
      login(creds, (status) => {
        if (status) {
          getActiveUser();
          // toggleSignUp(!signup);

          navigation.navigate("Main");
          setLoading(false);
        } else {
          // alert("Bad records!");
          // setServerError("Bad Creadantial OR Server Unavailable !");
          // setVisible(true);
          showToast("Bad Creadantial OR Server Unavailable !");
          setLoading(false);
        }
      });
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleRegister = () => {
    setError({
      name: "",
      email: "",
      password: "",
      repqssword: "",
    });
    setLoading(true);
    console.log("i am call");
    const psregx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailRgx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (name === "") {
      setError({ name: "Name can't be empty." });
      setLoading(false);
      return;
    } else if (email === "") {
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
      setLoading(false);
    }

    if (password === "") {
      setError({ password: "Password can't be empty." });
      setLoading(false);
      return;
    }
    if (password.length > 5) {
      const st = psregx.test(password);
      console.log("pass test", st);
      if (!st) {
        setError({
          password:
            "Password contains at least 1 Capital, 1 Numer, 1 Special Char ",
        });
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    if (repassword === "") {
      setError({ repassword: "Passwords doesn't match." });
      setLoading(false);
      return;
    } else if (password !== repassword) {
      setError({ repassword: "Passwords doesn't match." });
      setLoading(false);
      return;
    } else {
      setLoading(true);
      const creds = { name: name.trim(), email, password, repassword };
      register(creds, (status) => {
        if (status) {
          getActiveUser();

          setLoading(false);
          navigation.navigate("Main");
        } else {
          showToast("Email already exist OR Server Unavailable !");
          setLoading(false);
        }
      });
    }
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
          {serverError}
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
            {signup && (
              <>
                <Input
                  style={styles.username}
                  status={user.error && user.name ? "danger" : "basic"}
                  textStyle={styles.usernameTextStyle}
                  value={name}
                  placeholder="Full Name"
                  onChangeText={(name) => setName(name)}
                />
                <Text style={styles.errorMsg}>{error && error?.name}</Text>
              </>
            )}
            <Input
              style={styles.username}
              status={user.error && user.email ? "danger" : "basic"}
              textStyle={styles.usernameTextStyle}
              value={email}
              placeholder="Email"
              onChangeText={(email) => setEmail(email.trim())}
            />
            <Text style={styles.errorMsg}>{error && error?.email}</Text>
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
            {!signup ? (
              <Pressable
                onPress={() => navigation.navigate("Reset")}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ textAlign: "right", fontStyle: "italic" }}>
                  forget password?
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
            <Text style={styles.errorMsg}>{error && error?.password}</Text>

            {signup && (
              <>
                <Input
                  style={styles.password}
                  status={user.error && user.repassword ? "danger" : "basic"}
                  textStyle={styles.passwordTextStyle}
                  value={repassword}
                  placeholder="Confirm Password"
                  accessoryRight={renderIconRe}
                  secureTextEntry={secureTextEntryRe}
                  onChangeText={(repassword) =>
                    setPasswordRe(repassword.trim())
                  }
                />
                <Text style={styles.errorMsg}>
                  {error && error?.repassword}
                </Text>
              </>
            )}

            {/* {user.error && (
          <Text status="danger">
            {(() => {
              loading && setLoading(false);
              return user.message;
            })()}
          </Text>
        )} */}

            <Button
              style={styles.loginBtn}
              status="danger"
              onPress={
                !loading
                  ? () => (signup ? handleRegister() : handleLogin())
                  : null
              }
            >
              {loading ? (
                <Spinner size="small" status="basic" />
              ) : !signup ? (
                "LOGIN"
              ) : (
                "SIGN UP"
              )}
            </Button>
            <Button style={styles.signupTxt} onPress={() => toggleSignUp()}>
              {!signup ? "SIGN UP" : "CANCEL"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const mapStateToProps = ({ userApi }) => ({
  user: userApi,
});

export default connect(mapStateToProps, { login, register })(Login);
