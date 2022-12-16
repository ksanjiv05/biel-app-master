import React from "react";
import {
  Button,
  Input,
  Layout,
  Divider,
  ButtonGroup,
  Text,
} from "@ui-kitten/components";
import { View } from "react-native";

import ClientField from "./OrderForm/ClientField";

const OrderForm = ({ styles, navigation, handleChange, shipment }) => {
  const [packSizeValue, setPackSizeValue] = React.useState(0);
  //   const calcPayment = (shipment) =>
  //     shipment.items
  //       .map((item) => (item.rate ? item.rate : 0))
  //       .reduce((a, b) => a + b, 0);
  //   console.log(shipment);

  const handleChangePackSize = (shipment, packSize) => {
    packSize = packSize * 1;
    if (packSize > 0) {
      setPackSizeValue(packSize);
    } else {
      setPackSizeValue(0);
    }
    handleChange({ ...shipment, packSizeValue });
  };

  return (
    <>
      <View style={styles.input}>
        <ClientField navigation={navigation} styles={styles} />
      </View>
      <Divider style={[styles.divider, styles.dividerStatusBar]} />
      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Input
          style={styles.inputHalf}
          size="medium"
          label="Item Details"
          placeholder="Quality"
          size="large"
          onChangeText={(quality) => handleChange({ ...shipment, quality })}
        />
        <Input
          style={styles.inputHalf}
          size="medium"
          label={" "}
          placeholder="Variety"
          size="large"
          onChangeText={(variety) => handleChange({ ...shipment, variety })}
        />
      </Layout>
      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Input
          style={styles.input40}
          size="medium"
          placeholder="Packing Material"
          size="large"
          onChangeText={(packingMaterial) =>
            handleChange({ ...shipment, packingMaterial })
          }
        />
        <Input
          style={styles.input30}
          size="medium"
          placeholder="Pack Size"
          value={packSizeValue <= 0 ? null : packSizeValue.toString()}
          size="large"
          onChangeText={(packSize) => handleChangePackSize(shipment, packSize)}
        />
        <ButtonGroup status="control">
          <Button
            style={styles.buttonGroupBtn}
            onPress={() => {
              if (packSizeValue > 0) {
                setPackSizeValue(packSizeValue - 1);
              }
            }}
          >
            -
          </Button>
          <Button
            style={styles.buttonGroupBtn}
            onPress={() => setPackSizeValue(packSizeValue + 1)}
          >
            +
          </Button>
        </ButtonGroup>
      </Layout>
      <Input
        style={styles.input}
        size="medium"
        placeholder="Brand"
        size="large"
        onChangeText={(brand) => handleChange({ ...shipment, brand })}
      />
      <Divider style={styles.divider} />

      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Input
          style={styles.inputHalf}
          size="medium"
          label="Order Details"
          placeholder="Quantity"
          size="large"
          onChangeText={(quantity) => handleChange({ ...shipment, quantity })}
        />
        <Input
          style={styles.inputHalf}
          size="medium"
          label={" "}
          placeholder="Rate"
          size="large"
          onChangeText={(rate) => handleChange({ ...shipment, rate })}
        />
      </Layout>
      {/* <Layout style={styles.amountContainer}>
        {calcPayment(shipment) <= 0 ? null : (
          <>
            <Text style={styles.amountLabel}>Total Payment</Text>
            <Text style={styles.amount}>${calcPayment(shipment)}</Text>
          </>
        )}
      </Layout> */}
      <Layout style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Total Payment</Text>
        <Text style={styles.amount}>
          $
          {shipment.quantity * shipment.rate
            ? shipment.quantity * shipment.rate
            : 0}
        </Text>
      </Layout>
    </>
  );
};

export default OrderForm;
