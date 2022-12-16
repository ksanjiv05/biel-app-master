import React from "react";
import { CheckBox, Text, Input, Divider } from "@ui-kitten/components";

const PackageMaterialArrivedForm = ({ styles, handleChange, shipment }) => {
  return (
    <>
      <CheckBox
        style={styles.input}
        checked={shipment.telex}
        onChange={(telex) => handleChange({ ...shipment, telex })}
      >
        {`Documents/Telex status enable/disable`}
      </CheckBox>

      <Text category="s1" style={styles.input}>
        Documents Dispatch{" "}
      </Text>
      <Divider style={styles.divider} />
      <CheckBox
        style={styles.input}
        checked={shipment.toBuyer}
        disabled={shipment.telex}
        onChange={(toBuyer) => handleChange({ ...shipment, toBuyer })}
      >
        {`To Buyer`}
      </CheckBox>
      <CheckBox
        style={styles.input}
        checked={shipment.toBank}
        disabled={shipment.telex}
        onChange={(toBank) => handleChange({ ...shipment, toBank })}
      >
        {`To Bank`}
      </CheckBox>
      <Input
        style={styles.input}
        label="DHL No:"
        size="medium"
        placeholder="Please mention Packing Material"
        size="large"
        multiline={true}
        value={shipment?.dhl}
        onChangeText={(dhl) => handleChange({ ...shipment, dhl })}
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
          handleChange({
            ...shipment,
            comment,
          })
        }
      />
    </>
  );
};

export default PackageMaterialArrivedForm;
