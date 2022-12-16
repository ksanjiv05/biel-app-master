import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useFonts } from "expo-font";

export default function CustomButton({ label, onPress, backgroundColor }) {
	let [loaded] = useFonts({
		'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf')
	})
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor || "#4267B2",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 16,
          fontFamily: "Roboto-Medium",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
