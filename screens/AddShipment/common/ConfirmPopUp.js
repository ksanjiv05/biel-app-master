import React from "react";
import { Button, Card, Modal, Text, Layout } from "@ui-kitten/components";

const ConfirmPopUp = ({ styles, warning, setWarning, handleBack }) => (
  <Modal
    visible={false}
    backdropStyle={styles.backdrop}
    style={styles.warningContainer}
    onBackdropPress={() => setWarning(false)}
  >
    <Card
      status="danger"
      disabled={true}
      style={styles.warningContainerCard}
      footer={() => (
        <Layout style={styles.warningFooterContainer}>
          <Button
            appearance="ghost"
            status="basic"
            style={styles.warningBtn}
            onPress={() => handleBack()}
          >
            Yes
          </Button>
          <Button
            style={styles.warningBtn}
            status="danger"
            onPress={() => setWarning(false)}
          >
            No
          </Button>
        </Layout>
      )}
    >
      <Text style={styles.warningMsg}>Are you sure?</Text>
    </Card>
  </Modal>
);

export default ConfirmPopUp;
