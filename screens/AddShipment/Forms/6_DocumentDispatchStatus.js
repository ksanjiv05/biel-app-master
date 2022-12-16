import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme } from "@ui-kitten/components";

import { documentDispatchStatusUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
// import ConfirmPopUp from "../common/ConfirmPopUp";
import DocumentDispatchStatusForm from "./6_DocumentDispatchStatus/DocumentDispatchStatusForm";

const DocumentDispatchStatus = ({
  documentDispatchStatusUpdate,
  route,
  navigation,
  handleHeader,
  shipmentList,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    pi,
    dhl: "",
    telex: false,
    toBuyer: false,
    toBank: false,
    comment: "",
  });

  // const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState({});

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
    documentDispatchStatusUpdate(shipment, (uploadedData) => {
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment);
        setProgress({});

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
      handleHeader("Document Dispatch Status", ""); //to set header
    });
  }, []);

  React.useEffect(() => {
    setProgress(true);
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    // console.log("ship ", filteredShipment);
    if (filteredShipment.length > 0) {
      const documentDispatch = filteredShipment[0]?.documentDispatchStatus;
      documentDispatch &&
        setShipment({
          telex: documentDispatch.telex,
          toBuyer: documentDispatch.toBuyer,
          toBank: documentDispatch.toBank,
          dhl: documentDispatch?.dhl,
          pi: documentDispatch.pi,
          id: documentDispatch._id,
          comment: documentDispatch.comment,
        });
      setProgress(false);
    } else {
      setProgress(false);
    }

    return function cleanup() {
      setShipment(initialShipment());
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
          <DocumentDispatchStatusForm
            styles={styles}
            handleChange={handleChange}
            shipment={shipment}
            theme={theme}
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
export default connect(mapStateToProps, { documentDispatchStatusUpdate })(
  DocumentDispatchStatus
);
