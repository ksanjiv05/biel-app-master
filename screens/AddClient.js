import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme } from "@ui-kitten/components";

import { register, getUsers } from "../api/user/userActions";
import design from "./AddClient/design";
import Slider from "../common/components/Slider";
import Footer from "./AddClient/Footer";
import ConfirmPopUp from "./AddClient/ConfirmPopUp";
import ClientForm from "./AddClient/ClientForm";

const AddClient = ({ register, navigation, getUsers }) => {
  const [warning, setWarning] = React.useState(false);

  const [loader, setLoader] = React.useState(false);
  const [client, setClient] = React.useState({
    name: "",
    email: "",
    ext: "",
    phone: "",
    role: "",
    company: "",
    password: "",
  });

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    // navigation.navigate("Dashboard");
  };

  const handleSubmit = (client) => {
    setLoader(true);
    // console.log("i calll-------------------");
    register(client, (status) => {
      if (status) {
        getUsers({}, (status) => {
          console.log("user call", status);
        });
        setLoader(false);
        navigation.navigate("AddShipment");
      }
      // console.log("i calll--------+++-----------", status);
    });
  };

  const handleChange = (updateClient) => {
    setClient(updateClient);
  };

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
            loader={loader}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />
        <ScrollView>
          <ClientForm
            styles={styles}
            handleChange={handleChange}
            client={client}
            editUser={false}
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default connect(null, { register, getUsers })(AddClient);
