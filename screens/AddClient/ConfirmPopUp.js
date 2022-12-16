import React from "react";
import { Button, Card, Modal, Text, Layout } from "@ui-kitten/components";

const ConfirmPopUp = ({
  styles,
  warning,
  setWarning,
  handleBack,
  isVarified = false,
  editUser = false,
  handleUserVarification = () => {},
}) => (
  <Modal
    visible={warning}
    backdropStyle={styles.backdrop}
    style={styles.warningContainer}
    onBackdropPress={() => setWarning(false)}
  >
    <Card
      status={isVarified ? "success" : "danger"}
      disabled={true}
      style={styles.warningContainerCard}
      footer={() => (
        <Layout style={styles.warningFooterContainer}>
          <Button
            appearance={isVarified ? "filled" : "ghost"}
            status={isVarified ? "success" : "basic"}
            style={styles.warningBtn}
            onPress={() =>
              editUser ? handleUserVarification(!isVarified) : handleBack()
            }
          >
            Yes
          </Button>
          <Button
            appearance={isVarified ? "ghost" : "filled"}
            style={styles.warningBtn}
            status={isVarified ? "basic" : "danger"}
            onPress={() =>
              editUser ? handleUserVarification(false) : setWarning(false)
            }
          >
            No
          </Button>
        </Layout>
      )}
    >
      {editUser ? (
        <>
          <Text style={styles.warningMsg}>
            Are you sure you want to make{" "}
            {isVarified ? "Unverified?" : "verified?"}
          </Text>
        </>
      ) : (
        <Text style={styles.warningMsg}>Are you sure?</Text>
      )}
    </Card>
  </Modal>
);

export default ConfirmPopUp;
