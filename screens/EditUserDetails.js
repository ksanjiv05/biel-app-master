import { Card, useTheme } from "@ui-kitten/components";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { getCurrentUser, editUserDetails } from "../api/user/userActions";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import design from "./AddClient/design";
import Slider from "../common/components/Slider";
import Footer from "./AddClient/Footer";
import ConfirmPopUp from "./AddClient/ConfirmPopUp";
// import EditUserDetailsForm from "./EditUserDetails/EditUserDetailsForm";
import ClientForm from "./AddClient/ClientForm";
import { UserContext } from "../App";
// const roles = [
//   { title: "Admin" },
//   { title: "Client" },
//   { title: "Broker" },
//   { title: "Agent" },
// ];

// const filter = (item, query) =>
//   item.title.toLowerCase().includes(query.toLowerCase());

function EditUserDetails({
  getCurrentUser,
  editUserDetails,
  handleHeader,
  navigation,
  route,
}) {
  const { userData = null } = route?.params;
  // console.log("++", userData);
  // const [userData, setUserData] = React.useState({
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   isVerified: false,
  //   role: "",
  // });
  // const [value, setValue] = React.useState(null);
  // const [data, setData] = React.useState(roles);

  // const onSelect = (index) => {
  //   setValue(roles[index].title);
  //   handleChange("role", roles[index].title);
  // };

  // const handleChange = (key, value) => {
  //   setUserData((previousData) => ({ ...previousData, [key]: value }));
  // };
  // const onChangeText = (query) => {
  //   setValue(query);
  //   setData(roles.filter((item) => filter(item, query)));
  // };
  // const update = () => {
  //   console.log(userData);
  //   editUserDetails(userData, (status) => {
  //     if (status) {
  //       navigation.navigate("UserNav", {
  //         screen: "ViewUsers",
  //       });
  //     }
  //   });
  // };
  // const renderOption = (item, index) => (
  //   <AutocompleteItem key={index} title={item.title} />
  // );

  // React.useEffect(() => {
  //   // console.log(isDrawerOpen, "i am run drawer ", navigation);
  //   getCurrentUser({}, (currentUser) => {
  //     setUserData({
  //       email: currentUser.user.email,
  //       fname: currentUser.user.fname,
  //       lname: currentUser.user.lname,
  //       role: currentUser.user.role,
  //       isVerified: currentUser.user.isVerified,
  //     });
  //     setValue(currentUser.user.role);
  //   });
  // }, []);
  // return (
  //   <>
  //     <Input
  //       label="First Name"
  //       value={userData.fname}
  //       onChangeText={(fname) => handleChange("fname", fname)}
  //     />
  //     <Input
  //       label="Last Name"
  //       value={userData.lname}
  //       onChangeText={(lname) => handleChange("lname", lname)}
  //     />
  //     <Input
  //       label="Email"
  //       disabled={true}
  //       value={userData.email}
  //       onChangeText={(email) => handleChange("email", email)}
  //     />
  //     <Autocomplete
  //       label="Roles"
  //       placeholder="Place your Text"
  //       value={value}
  //       onSelect={onSelect}
  //       onChangeText={onChangeText}
  //     >
  //       {data.map(renderOption)}
  //     </Autocomplete>
  //     <Toggle
  //       checked={userData.isVerified}
  //       onChange={(isChecked) => handleChange("isVerified", isChecked)}
  //     >{`Is Varified User : ${userData.isVerified}`}</Toggle>
  //     <Button onPress={() => update()}>Update Details</Button>

  //   </>
  // );

  const initialData = {
    name: "",
    email: "",
    ext: "",
    phone: "",
    role: "",
    company: "",
    password: "",
    image: "",
  };
  const [warning, setWarning] = React.useState(false);
  const [client, setClient] = React.useState(initialData);

  const { getActiveUser } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  const handleSubmit = (client) => {
    // console.log(client);
    if (!client?.password?.length > 7) delete client["password"];
    editUserDetails(client, (status) => {
      if (status) {
        if (userData) {
          navigation.navigate("UserNav", {
            screen: "ViewUsers",
            params: { userUpdated: true },
          });
        } else {
          navigation.navigate("Dashboard");
          getActiveUser();
        }
      }
    });
  };

  const handleChange = (updateClient) => {
    setClient(updateClient);
  };

  React.useEffect(() => {
    //to change header text
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Edit User", "");
    });
    return unsubscribe;
  }, [navigation]);

  // React.useEffect(() => {
  //   // console.log(isDrawerOpen, "i am run drawer ", navigation);
  //   const ac = new AbortController();

  //   getCurrentUser({}, (currentUser) => {
  //     setClient({
  //       email: currentUser.user?.email,
  //       name: currentUser.user?.fname + " " + currentUser.user?.lname,
  //       phone: currentUser.user?.phone || "",
  //       role: currentUser.user?.role || "",
  //       company: currentUser.user?.company || "",
  //       password: "",
  //       image: "",
  //       ext: "",
  //     });
  //   });

  //   return () => ac.abort();
  // }, []);

  //23/12
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", () => {
  //     navigation.navigate("Dashboard");
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  const currentUser = () => {
    getCurrentUser({}, (currentUser) => {
      setClient({
        email: currentUser.user?.email,
        name: currentUser.user?.fname + " " + currentUser.user?.lname,
        phone: currentUser.user?.phone || "",
        role: currentUser.user?.role || "Abcd",
        company: currentUser.user?.company || "",
        password: "",
        image: "",
        ext: "",
      });
    });
  };

  React.useEffect(() => {
    if (userData) {
      setClient({
        email: userData?.email,
        name: userData?.fname + " " + userData?.lname,
        phone: userData?.phone || "",
        role: userData?.role || "",
        company: userData?.company || "",
        password: "",
        image: "",
        ext: "",
      });
    } else {
      currentUser();
    }

    return () => setClient(initialData);
  }, [route]);
  return (
    <>
      <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
      />
      <Card
        disabled={true}
        style={styles.container}
        footer={() => (
          <Footer
            styles={styles}
            setWarning={setWarning}
            handleSubmit={handleSubmit}
            client={client}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />
        <ScrollView>
          <ClientForm
            styles={styles}
            handleChange={handleChange}
            client={client}
            editUser={true}
          />
        </ScrollView>
      </Card>
    </>
  );
}

export default connect(null, { getCurrentUser, editUserDetails })(
  EditUserDetails
);
