import React from "react";
import { ScrollView, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, Text } from "@ui-kitten/components";

import { scheduleUpdate } from "../../../../api/shipment/shipmentActions";
import { getCurrentUser } from "../../../../api/user/userActions";
import design from "../../common/design";
import Slider from "../../../../common/components/Slider";
import Footer from "../../common/Footer";
// import ConfirmPopUp from "../common/ConfirmPopUp";
// import { upload } from "../../../common/util/fileUtil";

import ScheduleForm from "./ScheduleForm";

const Schedule = ({
  scheduleUpdate,
  route,
  navigation,
  handleHeader,
  getCurrentUser,
  shipmentList,
}) => {
  const { pi, order = null } = route.params;
  const initialShipment = () => ({
    pi,
    oid: "",
    quality: "",
    dateScheduled: new Date(),
    packingMatrial: "",
    packsize: "",
    brand: "",
    quantity: "",
    destinationPort: "",
    scheduleUpdate: "",
  });

  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState(true);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    // setWarning(false);
    // navigation.navigate("Schedule", { pi });
    navigation.navigate("ShipmentNav", {
      screen: "Schedule",
      params: { pi },
    });
  };

  const handleSubmit = (shipment) => {
    setLoader(true);
    // console.log("order id ro going updated", order._id);
    shipment.pi = pi;
    shipment.oid = order._id;
    scheduleUpdate(shipment, (uploadedData) => {
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment());
        // navigation.navigate("Schedule", { pi });
        navigation.navigate("ShipmentNav", {
          screen: "Schedule",
          params: { pi },
        });
      } else {
        setError(
          "Server is not able to process this request. Please try again !!"
        );
      }
    });
  };

  const handleChange = (updateShipment) => {
    setShipment(updateShipment);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Delivery Schedule Form", "");
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // navigation.navigate("Schedule", { pi });
      navigation.navigate("ShipmentNav", {
        screen: "Schedule",
        params: { pi },
      });
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setProgress(true);
    getCurrentUser({}, (currentUser) => {
      const filteredShipment =
        shipmentList &&
        shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
      // console.log("ship ", filteredShipment);
      if (filteredShipment.length > 0) {
        const scheduleObj = filteredShipment[0]?.scheduleUpdate;
        const scheduleOrderObj = scheduleObj.schedule.filter(
          (so) => so.oid == order._id
        );
        // console.log("scheduled-------------", scheduleOrderObj);
        if (
          scheduleObj &&
          scheduleOrderObj.length > 0 &&
          scheduleOrderObj[0].isScheduled
        ) {
          setShipment({
            quality: order.quality,
            dateScheduled: new Date(scheduleOrderObj[0].dateScheduled),
            packingMatrial: order.packingMaterial,
            packsize: order.packSize,
            brand: order.brand,
            quantity: order.quantity,
            destinationPort: scheduleOrderObj[0].destinationPort,
            scheduleUpdate: scheduleOrderObj[0].scheduleUpdate,
            pi: scheduleObj.pi,
            id: scheduleObj._id,
            oid: order._id,
          });
        } else {
          // console.log("user--xxx---", currentUser);
          setShipment({
            scheduleUpdate: currentUser && currentUser.user.email,
            dateScheduled: new Date(),
            packingMatrial: order.packingMaterial,
            packsize: order.packSize,
            brand: order.brand,
            quantity: order.quantity,
            quality: order.quality,
            oid: order._id,
          });
        }
        setProgress(false);
      } else {
        setProgress(false);

        // console.log("user--xxx---", currentUser);
        setShipment({
          dateScheduled: new Date(),
          scheduleUpdate: currentUser && currentUser.user.email,
          packingMatrial: order.packingMaterial,
          packsize: order.packSize,
          brand: order.brand,
          quantity: order.quantity,
          quality: order.quality,
          oid: order._id,
        });
      }
    });
    return () => setShipment(initialShipment());
  }, [pi]);

  return !progress ? (
    <>
      {/* <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
      /> */}

      <Card
        disabled={true}
        style={styles.container}
        footer={() => (
          <Footer
            styles={styles}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            shipment={shipment}
            error={error}
            loader={loader}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />
        <KeyboardAvoidingView behavior="height">
          <ScrollView contentContainerStyle={styles.innerContainer}>
            <ScheduleForm
              styles={styles}
              handleChange={handleChange}
              shipment={shipment}
              theme={theme}
              pi={pi}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Card>
    </>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Loading....</Text>
    </View>
  );
};
const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};
export default connect(mapStateToProps, { scheduleUpdate, getCurrentUser })(
  Schedule
);
