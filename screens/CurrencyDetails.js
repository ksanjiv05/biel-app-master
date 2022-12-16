import React from "react";
import { View, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { Text, useTheme } from "@ui-kitten/components";
import { currencyData } from "../api/shipment/shipmentActions";

const CurrencyDetails = ({ navigation, handleHeader, currencyData }) => {
  const theme = useTheme();
  const [currency, setCurrency] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Currency Details", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    currencyData({}, (data) => {
      const currencies = Object.entries(data);
      setCurrency(currencies);
    });
  }, [currencyData]);

  return (
    <View style={{ flex: 1, backgroundColor: theme["color-basic-300"] }}>
      <View
        style={{
          flexDirection: "row",
          //   flex: 1,
          height: "auto",
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 5,
          marginHorizontal: 5,
          //   backgroundColor: theme["color-basic-400"],
          borderRadius: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          {/* <Text category="c2">{"PI : #" + item._id}</Text> */}
          <Image
            source={{
              uri: "https://flagcdn.com/w40/us.png",
            }}
            style={{ width: 20, height: 15 }}
          />
        </View>
        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text style={{ fontSize: 11, color: theme["color-basic-600"] }}>
            US Dollar Exchange Rate
          </Text>
        </View>
      </View>
      <Text style={{ textAlign: "right", fontSize: 15 }} category="h5">
        1 US Dollar ={"  "}
      </Text>

      <FlatList
        data={currency}
        renderItem={({ item }) => {
          if (
            item[0] == "USD_AED" ||
            item[0] == "USD_AFN" ||
            item[0] == "USD_ALL" ||
            item[0] == "USD_INR"
          )
            return (
              <View
                style={{
                  flexDirection: "row",
                  //   flex: 1,
                  height: "auto",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  backgroundColor: theme["color-basic-400"],
                  borderRadius: 5,
                }}
              >
                <View style={{ flex: 2 }}>
                  {/* <Text category="c2">{"PI : #" + item._id}</Text> */}
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${
                        item[0] == "USD_AED"
                          ? "ae"
                          : item[0] == "USD_AFN"
                          ? "af"
                          : item[0] == "USD_ALL"
                          ? "al"
                          : "in"
                      }.png`,
                    }}
                    style={{ width: 20, height: 15 }}
                  />
                </View>
                <View style={{ flex: 4, justifyContent: "center" }}>
                  <Text
                    style={{ fontSize: 12, color: theme["color-basic-600"] }}
                  >
                    {item[0] == "USD_AED"
                      ? "United Arab Emirates"
                      : item[0] == "USD_AFN"
                      ? "Afghanistan"
                      : item[0] == "USD_ALL"
                      ? "Albania"
                      : "India"}
                  </Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center" }}>
                  <Text
                    style={{ fontSize: 13, color: theme["color-basic-600"] }}
                  >
                    {item[1]}
                  </Text>
                </View>
              </View>
            );
        }}
        keyExtractor={(item) => item[0]}
      />
    </View>
  );
};

export default connect(null, { currencyData })(CurrencyDetails);

// currency data Object {
//     "USD_AED": 3.672904,
//     "USD_AFN": 86.022057,
//     "USD_ALL": 104.154912,
//     "USD_INR": 74.352504,
//     "__v": 0,
//     "_id": "6120fba176a2df3c14b2397f",
//     "date": "2021-08-21T13:12:01.195Z",
//   }
