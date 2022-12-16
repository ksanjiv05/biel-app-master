import React from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme } from "@ui-kitten/components";

import { documentStatusUpdate } from "../../../api/shipment/shipmentActions";
import design from "../common/design";
import Slider from "../../../common/components/Slider";
import Footer from "../common/Footer";
// import ConfirmPopUp from "../common/ConfirmPopUp";
import DocumentStatusForm from "./4_DocumentStatus/DocumentStatusForm";

const DocumentStatus = ({
  documentStatusUpdate,
  route,
  navigation,
  handleHeader,
  shipmentList,
  // defaultProgress = true,
}) => {
  const { pi } = route.params;

  const initialShipment = () => ({
    underApproval: false,
    documentApproved: false,
    documentIssued: false,
    pi,
  });

  // const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment());
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [progress, setProgress] = React.useState(true);

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
    documentStatusUpdate(shipment, (uploadedData) => {
      setLoader(false);
      if (uploadedData) {
        //should be sent true
        setShipment(initialShipment());

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
      handleHeader("Document Status Form", "");
    });
  }, []);

  React.useEffect(() => {
    setProgress(true);
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    // console.log("ship ", filteredShipment);
    if (filteredShipment.length > 0) {
      const documentStatusObj = filteredShipment[0]?.documentStatus;
      documentStatusObj &&
        setShipment({
          underApproval: documentStatusObj.underApproval,
          documentApproved: documentStatusObj.documentApproved,
          documentIssued: documentStatusObj.documentIssued,
          pi: documentStatusObj.pi,
          id: documentStatusObj._id,
        });

      setProgress(false);
    } else {
      setProgress(false);
    }

    return function cleanup() {
      setShipment(initialShipment());
      setProgress(true);
    };
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
              // setWarning={setWarning}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
              shipment={shipment}
              error={error}
              // progress={progress}
              loader={loader}
            />
          )}
        >
          <Slider navigation={navigation} destination={"Dashboard"} />

          <ScrollView
            contentContainerStyle={styles.iDocumentStatusFormerContainer}
          >
            <DocumentStatusForm
              styles={styles}
              handleChange={handleChange}
              shipment={shipment}
              theme={theme}
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
export default connect(mapStateToProps, { documentStatusUpdate })(
  DocumentStatus
);
