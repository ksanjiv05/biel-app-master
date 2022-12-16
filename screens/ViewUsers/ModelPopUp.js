import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";

export const ModelPopUp = ({ visible, setVisible, isVarified = false }) => {
  return (
    <View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card style={{ padding: 20 }}>
          <Text>Are you sure you want to make</Text>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {isVarified ? "Unvarified" : "varified"}
          </Text>

          <View style={{ flex: 1, flexDirection: "row", marginTop: 8 }}>
            <View style={{ flex: 1 }}>
              <Button
                size="small"
                style={{ width: 60, display: "flex" }}
                onPress={() => setVisible(false)}
              >
                Yes
              </Button>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Button
                size="small"
                style={{ width: 60, display: "flex" }}
                onPress={() => setVisible(false)}
              >
                No
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
