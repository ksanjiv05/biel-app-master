import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, Text, Datepicker } from "@ui-kitten/components";

import { productionScheduleUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
// import ConfirmPopUp from "../common/ConfirmPopUp";

const ProductionSchedule = ({
  productionScheduleUpdate,
  route,
  navigation,
  shipmentList,
  handleHeader,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    productionSchedule: new Date(),
    dispatchSchedule: new Date(),
    pi,
  });

  // const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  // const [progress, setProgress] = React.useState({});

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    // setWarning(false);
    navigation.navigate("Shipment", { pi });
  };

  const handleSubmit = (shipment) => {
    setLoader(true);
    shipment.pi = pi;
    productionScheduleUpdate(shipment, (uploadedData) => {
      console.log("production sechedule update ", uploadedData);
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment);
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
      handleHeader("Production Schedule Form", ""); //to set header
    });
  }, []);

  React.useEffect(() => {
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    // console.log("ship ", filteredShipment);
    if (filteredShipment.length > 0) {
      const productionScheduleObj = filteredShipment[0]?.productionSchedule;
      productionScheduleObj &&
        setShipment({
          productionSchedule: new Date(
            productionScheduleObj.productionSchedule
          ),
          dispatchSchedule: new Date(productionScheduleObj.dispatchSchedule),
          pi: productionScheduleObj.pi,
          id: productionScheduleObj._id,
        });
    }
    return () => setShipment(initialShipment);
  }, [pi]);

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

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Datepicker
            label="Production Schedule"
            size="large"
            style={styles.input}
            date={shipment.productionSchedule}
            // onSelect={(nextDate) => handleChange("productionSchedule", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                productionSchedule: date,
              }))
            }
          />
          <Datepicker
            label="Dispatch Schedule"
            size="large"
            style={styles.input}
            date={shipment.dispatchSchedule}
            // onSelect={(nextDate) => handleChange("dispatchSchedule", nextDate)}
            onSelect={(date) =>
              setShipment((previosData) => ({
                ...previosData,
                dispatchSchedule: date,
              }))
            }
          />
        </ScrollView>
      </Card>
    </>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};
export default connect(mapStateToProps, { productionScheduleUpdate })(
  ProductionSchedule
);
