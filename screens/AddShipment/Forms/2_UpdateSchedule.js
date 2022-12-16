import React, { useState } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { Text, useTheme, CheckBox, Button, Icon } from "@ui-kitten/components";
import {
  getCurrentUser,
  getShipmentDetails,
} from "../../../api/user/userActions";

const UpdateSchedule = ({
  navigation,
  handleHeader,
  route,
  getCurrentUser,
  shipmentList = [],
}) => {
  const { pi } = route.params;
  const theme = useTheme();
  const [order, setOrder] = useState([]);
  const [progress, setProgress] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setOrder(route && route.params.shipmentData.order);
      handleHeader("Select Order to Scheduled", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setOrder([]);
      navigation.navigate("Shipment", {
        pi: route && route.params?.shipmentData?.pi,
      });
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setProgress(true);
    getCurrentUser({}, (currentUser) => {
      const filteredShipment =
        shipmentList &&
        shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
      if (filteredShipment.length > 0) {
        // console.log("filtered data ", filteredShipment);

        setOrder(filteredShipment[0].order);
        setProgress(false);
      } else {
        setProgress(false);
      }
    });
    return () => setOrder([]);
  }, [pi]);

  // const onRefresh = React.useCallback(async () => {
  //   console.log("update x");
  //   getShipmentDetails({ pi }, (status) => {
  //     if (status) {
  //       getUsers({}, (userStatus) => {
  //         setRefreshing(false);
  //       });
  //     }
  //     setRefreshing(false);
  //   });
  // }, [refreshing]);

  React.useEffect(() => {
    // tconsole.log("call to update");
    const filteredShipment =
      shipmentList &&
      shipmentList.filter((shipmentObj) => shipmentObj.pi == pi);
    if (filteredShipment.length > 0) {
      setOrder(filteredShipment[0].order);
    }
    return () => setOrder([]);
  }, [shipmentList]);

  const handleScheduling = (order) => {
    navigation.navigate("ShipmentNav", {
      screen: "ScheduleForm",
      params: { order: order, pi: pi },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme["color-basic-300"] }}>
      {progress ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={order}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handleScheduling(item)}
              underlayColor="transparent"
              // disabled={item?.isScheduled}
            >
              <>
                <View
                  style={{
                    flexDirection: "row",
                    //   flex: 1,
                    height: "auto",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    marginHorizontal: 5,
                    backgroundColor: item?.isScheduled
                      ? theme["color-success-transparent-500"]
                      : theme["color-danger-transparent-500"],
                    borderRadius: 5,
                  }}
                >
                  <>
                    <View style={{ flex: 3 }}>
                      {/* <Text category="c2">{"PI : #" + item._id}</Text> */}
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        PI
                      </Text>
                      <Text style={{ fontSize: 14 }}>{pi}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Brand
                      </Text>
                      <Text style={{ fontSize: 14 }}>{item.brand}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Size
                      </Text>
                      <Text style={{ fontSize: 13 }}>{item.packSize}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Material
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {item.packingMaterial}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Quality
                      </Text>
                      <Text style={{ fontSize: 13 }}>{item.quality}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme["color-basic-600"],
                        }}
                      >
                        Quntity
                      </Text>
                      <Text style={{ fontSize: 14 }}>{item.quantity}</Text>
                    </View>
                    <View>
                      <Text></Text>
                    </View>
                  </>
                </View>
              </>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item._id}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      )}
    </View>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};
export default connect(mapStateToProps, { getCurrentUser })(UpdateSchedule);
