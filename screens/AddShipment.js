import React from "react";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  Input,
  useTheme,
  Layout,
  Datepicker,
  Text,
  Divider,
  Button,
} from "@ui-kitten/components";

import { addShipment } from "../api/shipment/shipmentActions";
import design from "./AddShipment/common/design";
import Slider from "../common/components/Slider";
import Footer from "./AddShipment/common/Footer";
// import ConfirmPopUp from "./AddShipment/common/ConfirmPopUp";
import ClientField from "./AddShipment/ClientField";
import CountryField from "./AddShipment/CountryField";
import BrokerField from "./AddShipment/BrokerField";
import AgnetField from "./AddShipment/AgentField";
import OrderDetails from "./AddShipment/OrderDetails";

const AddShipment = ({
  addShipment,
  navigation,
  handleHeader,
  route,
  shipmentList,
}) => {
  const initialShipment = {
    pi: "",
    date: "",
    client: "",
    agent: "",
    broker: "",
    country: "",
    destinationPort: "",
    id: "",
    invoiceNo: "",
  };

  const { pi } = route.params;
  const [warning, setWarning] = React.useState(false);
  const [shipment, setShipment] = React.useState(initialShipment);
  const [error, setError] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [orders, setOrders] = React.useState([1]);
  const [order, setOrder] = React.useState([
    {
      brand: "",
      packSize: "",
      packingMaterial: "",
      quality: "",
      quantity: "",
    },
  ]);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    // setWarning(false);
    navigation.navigate("Dashboard");
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      handleHeader("New Shipment", "");
    });
  }, [navigation]);

  // React.useEffect(() => {
  //   setShipment({ ...shipment, order });
  // }, [order]);
  const shipmentInitlize = () => {
    setShipment(initialShipment);
    setOrders([1]);

    setOrder([
      {
        brand: "",
        packSize: "",
        packingMaterial: "",
        quality: "",
        quantity: "",
      },
    ]);
  };

  const handleSubmit = (shipment) => {
    if (!loader) {
      setLoader(true);
      shipment.order = order;
      addShipment(shipment, (uploadedData) => {
        setLoader(false);
        if (uploadedData) {
          shipmentInitlize();
          navigation.navigate("Dashboard");
        } else {
          setError("Server Error");
        }
      });
    }
  };

  const handleChange = (key, value) => {
    setShipment({ ...shipment, [key]: value });
  };

  const handleOrder = (key, value, index) => {
    setOrder([
      ...order.map((singleOrder, i) =>
        i !== index ? singleOrder : { ...singleOrder, [key]: value }
      ),
    ]);
  };

  const handleAddItem = () => {
    setOrder([
      ...order,
      {
        brand: "",
        quality: "",
        packingMaterial: "",
        packSize: "",
        quantity: "",
      },
    ]);
    setOrders([...orders, 1]);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // navigation.navigate("Dashboard");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    if (filteredShipment.length > 0) {
      const shipmentObj = filteredShipment[0];
      // console.log("shipmentObj++++++++++++", shipmentObj);
      if (shipmentObj) {
        setShipment({
          pi: shipmentObj?.pi,
          date: new Date(shipmentObj?.date),
          client: shipmentObj?.client,
          agent: shipmentObj?.agent,
          broker: shipmentObj?.broker,
          country: shipmentObj?.country,
          destinationPort: shipmentObj?.destinationPort,
          id: shipmentObj?._id,
          invoiceNo: shipmentObj?.invoiceNo,
        });

        setOrders([...shipmentObj?.order.map((o) => 1), 1]);
        setOrder([
          ...shipmentObj?.order,
          {
            brand: "",
            packSize: "",
            packingMaterial: "",
            quality: "",
            quantity: "",
          },
        ]);
      }
      // console.log("-====================================-", orders);
    }
    return () => shipmentInitlize();
  }, [pi, shipmentList]);

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
        <KeyboardAvoidingView behavior="height">
          <ScrollView contentContainerStyle={styles.innerContainer}>
            <Layout style={[styles.inputHorizontalGroup, styles.input]}>
              <Input
                style={styles.inputHalf}
                size="large"
                value={shipment.pi}
                label="PI Number"
                placeholder="Unique PI Number..."
                onChangeText={(nextValue) => handleChange("pi", nextValue)}
              />

              <Datepicker
                label="Date"
                size="large"
                style={styles.inputHalf}
                date={shipment.date}
                onSelect={(nextDate) => handleChange("date", nextDate)}
              />
            </Layout>

            <Layout
              style={[
                styles.itemBelowAutoCompleteFix,
                styles.inputGroup,
                styles.input,
                styles.agent,
              ]}
            >
              <AgnetField
                styles={styles}
                handleChange={handleChange}
                navigation={navigation}
                shipment={shipment}
              />
              <BrokerField
                styles={styles}
                handleChange={handleChange}
                navigation={navigation}
                shipment={shipment}
              />
            </Layout>

            <Layout style={[styles.inputGroup, styles.itemBelowAgent]}>
              <Text category="s1">Buyer Details</Text>
              <Divider style={styles.divider} style={styles.section} />
              <ClientField
                navigation={navigation}
                styles={styles}
                handleChange={handleChange}
                shipment={shipment}
              />
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                value={shipment.invoiceNo}
                label="Invoice Number"
                placeholder="Enter invoice number"
                onChangeText={(nextValue) =>
                  handleChange("invoiceNo", nextValue)
                }
              />
            </Layout>

            <Layout
              style={[
                styles.itemBelowAutoCompleteFix,
                styles.inputHorizontalGroup,
                styles.input,
              ]}
            >
              <Input
                style={[
                  styles.inputHalf,
                  styles.autoCompleteFix,
                  styles.itemBelowAutoCompleteFix,
                ]}
                size="large"
                value={shipment.destinationPort}
                label="Destination Port"
                placeholder="port name..."
                onChangeText={(nextValue) =>
                  handleChange("destinationPort", nextValue)
                }
              />
              <CountryField
                styles={styles}
                handleChange={handleChange}
                countryName={shipment.country}
                shipment={shipment}
              />
            </Layout>

            <Layout style={styles.dividerBelowAutoCompleteFix}>
              <Text category="s1">Order Details</Text>
              <Divider style={styles.divider} style={styles.section} />
            </Layout>

            {orders.map((orderS, index) => (
              <OrderDetails
                handleOrder={handleOrder}
                order={order[index]}
                styles={styles}
                key={index}
                index={index}
              />
            ))}

            <Layout style={styles.inputGroup}>
              <Button status="warning" onPress={handleAddItem}>
                Add Item
              </Button>
            </Layout>
          </ScrollView>
        </KeyboardAvoidingView>
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
export default connect(mapStateToProps, { addShipment })(AddShipment);
