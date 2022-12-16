import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Spinner, useTheme } from "@ui-kitten/components";
export default function Loader() {
  const theme = useTheme();
  const styles = {
    loderContainer: {
      // display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    loderText: { color: theme["color-basic-200"] },
  };
  return (
    <View style={styles.loderContainer}>
      <Spinner status="danger" size="large" />
      <Text style={styles.loderText}>Loding...</Text>
    </View>
  );
}
