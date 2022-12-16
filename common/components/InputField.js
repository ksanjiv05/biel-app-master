import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText
}) {
	let [loaded] = useFonts({
		Roboto: require('../../assets/fonts/Roboto-Medium.ttf')
	})
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          value={value}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, }}
          value={value}
          onChangeText={onChangeText}
        />
      )}

      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text
          style={{
            color: "#AD40AF",
            fontWeight: "700",
            fontFamily: "Roboto-Bold",
          }}
        >
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
