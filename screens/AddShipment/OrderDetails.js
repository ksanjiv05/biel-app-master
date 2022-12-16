import React from "react";
import { Layout, Input, Text } from "@ui-kitten/components";

const OrderDetails = ({ handleOrder, order, styles, index }) => {
  // console.log("order come - in ", order);
  return (
    <>
      <Layout style={styles.inputGroup}>
        <Text category="s2" style={styles.orderNumber}>
          {index + 1}.
        </Text>
        <Input
          size="large"
          value={order.brand}
          label="Brand"
          placeholder="brand..."
          onChangeText={(nextValue) => handleOrder("brand", nextValue, index)}
        />
      </Layout>

      <Layout
        style={[
          styles.inputHorizontalGroup,
          styles.inputHorizontalGroupMarginBottom,
        ]}
      >
        <Input
          style={styles.inputHalf}
          size="large"
          value={order.quality}
          label="Quality"
          placeholder="quality..."
          onChangeText={(nextValue) => handleOrder("quality", nextValue, index)}
        />
        <Input
          style={styles.inputHalf}
          size="large"
          value={order.packingMaterial}
          label="Packing Material"
          placeholder="material..."
          onChangeText={(nextValue) =>
            handleOrder("packingMaterial", nextValue, index)
          }
        />
      </Layout>

      <Layout style={styles.inputHorizontalGroup}>
        <Input
          style={styles.inputHalf}
          size="large"
          value={order.packSize}
          label="Pack Size &amp; no."
          placeholder="pack size, no..."
          onChangeText={(nextValue) =>
            handleOrder("packSize", nextValue, index)
          }
        />

        <Input
          // keyboardType="numeric"
          style={styles.inputHalf}
          size="large"
          value={order?.quantity.toString()}
          label="Quantity"
          placeholder="quantity..."
          onChangeText={(nextValue) =>
            handleOrder("quantity", nextValue, index)
          }
        />
      </Layout>
    </>
  );
};

export default OrderDetails;
