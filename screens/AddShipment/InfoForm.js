import React from "react";
import { Input, Layout, Divider } from "@ui-kitten/components";
import FileUpload from "./common/FileUpload";

const InfoForm = ({ styles, handleChange, shipment, theme, progress }) => {
  return (
    <>
      <Input
        style={styles.input}
        size="medium"
        label="From"
        placeholder="Consignee Details"
        size="large"
        onChangeText={(consigneeDetails) =>
          handleChange({ ...shipment, consigneeDetails })
        }
      />
      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Input
          style={styles.inputHalf}
          size="medium"
          placeholder="Port of Discharge"
          size="large"
          onChangeText={(portOfDischarge) =>
            handleChange({ ...shipment, portOfDischarge })
          }
        />
        <Input
          style={styles.inputHalf}
          size="medium"
          placeholder="Delivery Schedule"
          size="large"
          onChangeText={(deliverySchedule) =>
            handleChange({ ...shipment, deliverySchedule })
          }
        />
      </Layout>
      <Divider style={styles.divider} />
      <Input
        style={styles.input}
        size="medium"
        placeholder="Buyer Details"
        label="To"
        size="large"
        onChangeText={(buyerDetails) =>
          handleChange({ ...shipment, buyerDetails })
        }
      />
      <Layout style={[styles.inputHorizontalGroup, styles.input]}>
        <Input
          style={styles.inputHalf}
          size="medium"
          placeholder="Destination Country"
          size="large"
          onChangeText={(destinationCountry) =>
            handleChange({ ...shipment, destinationCountry })
          }
        />
        <Input
          style={styles.inputHalf}
          size="medium"
          placeholder="Bank Details"
          size="large"
          onChangeText={(bankDetails) =>
            handleChange({ ...shipment, bankDetails })
          }
        />
      </Layout>
      <FileUpload
        styles={styles}
        shipment={shipment}
        theme={theme}
        progress={progress}
      />
    </>
  );
};

export default InfoForm;
