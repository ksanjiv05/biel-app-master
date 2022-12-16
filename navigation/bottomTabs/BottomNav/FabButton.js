import React from "react";
import { Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const FabButton = ({ styles }) => {
  const navigation = useNavigation();
  return (
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      offsetY={0}
      offsetX={0}
      size={80}
    >
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Add Shipment"
        size={60}
        onPress={() =>
          navigation.navigate("ShipmentNav", { screen: "AddShipment" })
        }
      >
        <Icon name="car-outline" fill="white" style={styles.plusIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        size={60}
        title="Add Article"
        onPress={() => {}}
      >
        <Icon name="cast-outline" fill="white" style={styles.plusIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};

export default FabButton;
