import { Icon, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

const Slider = ({ navigation, destination }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 5,
    },
    slider: {
      width: "30%",
      height: 6,
      borderRadius: 50,
    },
    icon: {
      width: 32,
      height: 32,
    },
  });

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-ios-downward-outline"
        style={styles.icon}
        fill={theme["color-basic-800"]}
        onPress={() => {
          navigation.navigate(destination);
        }}
      ></Icon>
    </View>
  );
};

export default Slider;
