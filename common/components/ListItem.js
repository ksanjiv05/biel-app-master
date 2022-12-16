import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { windowWidth } from "../../utils/Dimensions";
import { useFonts } from "expo-font";

export default function ListItem({ product, size, price, photo }) {
  let [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Roboto: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 20,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Image
          source={photo}
          style={{ width: 55, height: 55, borderRadius: 10, marginRight: 8 }}
        />
        <View style={{ width: windowWidth - 220 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#532C19",
              fontFamily: "Roboto",
              textTransform: "uppercase",
            }}
          >
            {product}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              color: "#7D5B42",
              textTransform: 'uppercase'
            }}
          >
            {size}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 5,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#284B00",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {currencyFormat(parseInt(price))}
        </Text>
      </View>
    </View>
  );
}
