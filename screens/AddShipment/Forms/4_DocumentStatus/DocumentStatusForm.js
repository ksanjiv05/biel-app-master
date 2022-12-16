import React from "react";
import { CheckBox, Text, Divider } from "@ui-kitten/components";

const DocumentStatusForm = ({ styles, handleChange, shipment, theme }) => {
  return (
    <>
      <Text style={styles.input}>Draft Documents</Text>
      <Divider style={styles.divider} />
      <CheckBox
        style={styles.input}
        checked={shipment.underApproval}
        onChange={(underApproval) =>
          handleChange({ ...shipment, underApproval })
        }
      >
        {`Under Approval `}
      </CheckBox>
      <CheckBox
        style={styles.input}
        checked={shipment.documentApproved}
        onChange={(documentApproved) =>
          handleChange({ ...shipment, documentApproved })
        }
      >
        {`Documents Approved`}
      </CheckBox>
      <Divider style={styles.divider} />
      <CheckBox
        style={styles.input}
        checked={shipment.documentIssued}
        onChange={(documentIssued) =>
          handleChange({ ...shipment, documentIssued })
        }
      >
        {`Documents Issued`}
      </CheckBox>
    </>
  );
};

export default DocumentStatusForm;
