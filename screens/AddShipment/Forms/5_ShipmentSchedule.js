import React from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  useTheme,
  Datepicker,
  Input,
  Divider,
} from "@ui-kitten/components";

import { shipmentScheduleUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
// import ConfirmPopUp from "../common/ConfirmPopUp";

const ShipmentSchedule = ({
  shipmentScheduleUpdate,
  route,
  navigation,
  handleHeader,
  shipmentList,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    pi,
    estDeparture: new Date(),
    estArrival: new Date(),
    billLandingNo: "",
    containerNo: "",
    comment: "",
  });

  // const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState(false);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    // setWarning(false);
    // setShipment(initialShipment());
    setProgress(true);
    navigation.navigate("Shipment", { pi });
  };

  const handleSubmit = (shipment) => {
    setLoader(true);
    shipment.pi = pi;
    shipmentScheduleUpdate(shipment, (uploadedData) => {
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment);
        // setProgress({});

        navigation.navigate("Shipment", { pi });
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
    navigation.addListener("focus", () => {
      handleHeader("Shipment Schedule Form", ""); //to set header
    });
  }, []);
  React.useEffect(() => {
    setProgress(true);
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    // console.log("ship ", filteredShipment);
    if (filteredShipment.length > 0) {
      const shipmentScheduleUpdate = filteredShipment[0]?.shipmentSchedule;
      shipmentScheduleUpdate &&
        setShipment({
          estDeparture: new Date(shipmentScheduleUpdate.estDeparture),
          estArrival: new Date(shipmentScheduleUpdate.estArrival),
          billLandingNo: shipmentScheduleUpdate.billLandingNo,
          containerNo: shipmentScheduleUpdate?.containerNo,
          pi: shipmentScheduleUpdate.pi,
          id: shipmentScheduleUpdate._id,
          comment: shipmentScheduleUpdate.comment,
        });
      setProgress(false);
    } else {
      setProgress(false);
    }

    return function cleanup() {
      setShipment(initialShipment);
      setProgress(true);
    };
  }, [shipmentList, pi]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      navigation.navigate("Shipment", { pi });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      {/* <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
      /> */}
      {progress ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Loading....</Text>
        </View>
      ) : (
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
              progress={progress}
            />
          )}
        >
          <Slider navigation={navigation} destination={"Dashboard"} />

          <ScrollView contentContainerStyle={styles.innerContainer}>
            <Datepicker
              label="Estimated Time of Departure"
              size="large"
              style={styles.input}
              date={shipment.estDeparture}
              // onSelect={(nextDate) => handleChange("estDeparture", nextDate)}
              onSelect={(date) =>
                setShipment((previosData) => ({
                  ...previosData,
                  estDeparture: date,
                }))
              }
            />
            <Datepicker
              label="Estimated Time of Arrival"
              size="large"
              style={styles.input}
              date={shipment.estArrival}
              // onSelect={(nextDate) => handleChange("estArrival", nextDate)}
              onSelect={(date) =>
                setShipment((previosData) => ({
                  ...previosData,
                  estArrival: date,
                }))
              }
            />
            <Divider style={styles.divider} />
            <Input
              style={styles.input}
              label="Container's No:"
              size="medium"
              placeholder="Please Enter container's no. "
              size="large"
              value={shipment?.containerNo}
              multiline={true}
              onChangeText={(bill) =>
                setShipment((previosData) => ({
                  ...previosData,
                  containerNo: bill,
                }))
              }
            />
            <Input
              style={styles.input}
              label="Bill of Lading No:"
              size="medium"
              placeholder="Please mention Packing Material"
              size="large"
              value={shipment?.billLandingNo}
              multiline={true}
              onChangeText={(bill) =>
                setShipment((previosData) => ({
                  ...previosData,
                  billLandingNo: bill,
                }))
              }
            />
            <Divider style={styles.divider} />
            <Input
              style={styles.input}
              label="Comment:"
              size="medium"
              placeholder="Comment here"
              size="large"
              value={shipment?.comment}
              multiline={true}
              onChangeText={(comment) =>
                setShipment((previosData) => ({
                  ...previosData,
                  comment: comment,
                }))
              }
            />
          </ScrollView>
        </Card>
      )}
    </>
  );
};
const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};
export default connect(mapStateToProps, { shipmentScheduleUpdate })(
  ShipmentSchedule
);
