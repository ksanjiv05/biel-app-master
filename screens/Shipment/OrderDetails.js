import React from "react";
import { View, FlatList } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";

const OrderDetails = ({ navigation, handleHeader, route }) => {
  const theme = useTheme();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Order Details", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      navigation.navigate("Shipment", {
        pi: route && route.params?.shipmentData?.pi,
      });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: theme["color-basic-300"] }}>
      <FlatList
        data={route && route.params.shipmentData.order}
        renderItem={({ item }) => (
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
            <View style={{ flex: 3 }}>
              {/* <Text category="c2">{"PI : #" + item._id}</Text> */}
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                PI
              </Text>
              <Text style={{ fontSize: 14 }}>
                {route && route.params?.shipmentData?.pi}
              </Text>
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                Brand
              </Text>
              <Text style={{ fontSize: 14 }}>{item.brand}</Text>
              {/* <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                  Quality
                </Text>
                <Text category="label">{" " + item.quality}</Text>
              </View> */}
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                Size
              </Text>
              <Text style={{ fontSize: 13 }}>{item.packSize}</Text>
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                Material
              </Text>
              <Text style={{ fontSize: 13 }}>{item.packingMaterial}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                Quality
              </Text>
              <Text style={{ fontSize: 13 }}>{item.quality}</Text>
              <Text style={{ fontSize: 10, color: theme["color-basic-600"] }}>
                Quntity
              </Text>
              <Text style={{ fontSize: 14 }}>{item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default OrderDetails;

// {
//     "_id": "6120d9ff89892514b84fbc98",
//     "brand": "Nick",
//     "packSize": "2ey",
//     "packingMaterial": "Poli",
//     "quality": "Q23",
//     "quantity": 666,
//   },
// ],
// "packagingMaterialStatus": Object {
//   "__v": 0,
//   "_id": "612374876c91784d140b987d",
//   "artWorkApproved": false,
//   "artWorkUnderApproval": true,
//   "date": "2021-08-23T10:12:23.157Z",
//   "packagingMatrialReceived": true,
//   "pi": "1234",
//   "underPrinting": false,
// },
// "pi": "1234",
// "productionSchedule": null,
// "schedule": null,
// "shipmentSchedule": null,
// "sourceCount
