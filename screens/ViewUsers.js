import React from "react";
import { View, ScrollView } from "react-native";
import {
  useTheme,
  Icon,
  Menu,
  MenuGroup,
  ListItem,
  Text,
  Avatar,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { ModelPopUp } from "./ViewUsers/ModelPopUp";
import ConfirmPopUp from "./AddClient/ConfirmPopUp";
import design from "./AddShipment/common/design";
import { editUserVarification, getUsers } from "../api/user/userActions";

const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const ItemImage = (props, pic) => {
  // console.log(pic);
  return (
    <Avatar
      {...props}
      style={{
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 111,
      }}
      source={{
        uri:
          pic !== undefined
            ? "data:image/jpg;base64," + pic
            : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png",
      }}
    />
  );
};

const ViewUsers = ({
  navigation,
  handleHeader,
  userList,
  getUsers,
  editUserVarification,
  route,
}) => {
  const { userUpdated = false } = route?.params;
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [warning, setWarning] = React.useState(false);
  const [isVarified, setIsVarified] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Users", ""); //to set header
    });
    return unsubscribe;
  }, [navigation]);

  const getUpdatedUsers = () => {
    getUsers({}, (userStatus) => {
      console.log("users -", userStatus);
      setLoader(false);
    });
  };
  React.useEffect(() => {
    setLoader(true);
    getUpdatedUsers();
  }, [route]);
  const handleModal = (isVarified, email) => {
    setSelectedUser(email);
    setIsVarified(isVarified);
    setWarning(true);
  };

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  const handleUserVarification = (varifictionConformations) => {
    editUserVarification(
      { isVerified: varifictionConformations, email: selectedUser },
      (status) => {
        console.log("edit varifiaction details", status);
        getUpdatedUsers();
        setWarning(false);
      }
    );
  };

  //23/12
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", () => {
  //     navigation.navigate("Dashboard");
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <>
      <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
        isVarified={isVarified}
        editUser={true}
        handleUserVarification={handleUserVarification}
      />
      {loader ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Loading....</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Menu
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            {userList && userList.length > 0 ? (
              userList
                .sort(function (a, b) {
                  if (a.fname < b.fname) {
                    return -1;
                  }
                  if (a.fname > b.fname) {
                    return 1;
                  }
                  return 0;
                })
                .map((user, index) => {
                  return (
                    <MenuGroup
                      title={user.fname + " " + user.lname}
                      accessoryLeft={UserIcon}
                      key={index}
                    >
                      <ListItem
                        onPress={() =>
                          navigation.navigate("UserNav", {
                            screen: "EditDetails",
                            params: { userData: user },
                          })
                        }
                        style={{ backgroundColor: "#FAF7EE" }}
                        title={user.role}
                        description={user.email}
                        accessoryLeft={(props) =>
                          ItemImage(props, user?.profilePic)
                        }
                        accessoryRight={(props) => (
                          <Button
                            {...props}
                            appearance="ghost"
                            status={user.isVerified ? "success" : "danger"}
                            onPress={() =>
                              handleModal(user.isVerified, user.email)
                            }
                            accessoryLeft={(props) => (
                              <Icon
                                {...props}
                                color={user.isVerified ? "#2ce69b" : "#e62c79"}
                                name={
                                  user.isVerified
                                    ? "person-done-outline"
                                    : "person-delete-outline"
                                }
                              />
                            )}
                          />
                        )}
                      />
                    </MenuGroup>
                  );
                })
            ) : (
              <></>
            )}
          </Menu>
        </ScrollView>
      )}
    </>
  );
};

const mapStateToProps = ({ userApi }) => {
  return {
    userList: userApi,
  };
};

export default connect(mapStateToProps, { editUserVarification, getUsers })(
  ViewUsers
);
