import { useTheme, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { connect } from "react-redux";
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ShipmentEntry from "./Dashboard/ShipmentEntry";
import Chart from "./Dashboard/Chart";
import {
  getShipments,
  getMoreShipments,
} from "../api/shipment/shipmentActions";
import { getUsers } from "../api/user/userActions";
import { UserContext } from "../App";

const Dashboard = ({
  shipmentList,
  getShipments = [],
  navigation,
  handleHeader,
  getUsers,
  clients,
}) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [lowerColor, setLowerColor] = React.useState(
    theme["color-basic-transparent-100"]
  );
  const { isAdminX } = React.useContext(UserContext);
  const styles = StyleSheet.create({
    inactiveContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: Dimensions.get("window").height,
    },
    image: {
      width: "100%",
      height: 350,
    },
    gradient: {
      flex: 1,
      marginBottom: 70,
    },
    inactiveText: {
      color: theme["color-basic-400"],
      textAlign: "center",
      fontSize: 15,
      marginHorizontal: 50,
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const lowerColorToggle = () => {
    if (lowerColor !== theme["color-basic-100"])
      setLowerColor(theme["color-basic-100"]);
  };

  React.useEffect(() => {
    setLoader(true);
    getShipments({ page: page }, (status) => {
      if (status) setPage(page + 1);
      //TODO: need to implement pagination//get user changed v0.0.2
      getUsers({ user: "" }, (status) => {
        setLoader(false);
        console.log("user fatched", status);
        //   setPage(page + 1);
      });
    });
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getShipments({ page: page }, (status) => {
      if (status) {
        setPage(page + 1);
        setRefreshing(false);
      }

      setLoader(false);
    });
  }, [refreshing]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Dashboard", "");
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      colors={[theme["color-primary-500"], lowerColor]}
      locations={[0, 0.6]}
      style={styles.gradient}
    >
      {!loader ? (
        shipmentList.length < 1 ? (
          <View style={styles.inactiveContainer}>
            <Image
              source={require("../assets/dashboard_bg.png")}
              style={styles.image}
            />
            <Text style={styles.inactiveText}>
              No shipments found. Please add a shipment by clicking the + button
              below.
            </Text>
          </View>
        ) : (
          (() => {
            lowerColorToggle();
            return (
              <FlatList
                data={shipmentList}
                renderItem={({ item, index }) => {
                  if (index === 0) {
                    return (
                      <>
                        {isAdminX ? <Chart theme={theme} /> : <></>}
                        <ShipmentEntry
                          shipment={item}
                          navigation={navigation}
                          clientData={
                            clients &&
                            clients.find(
                              (client) => item.client === client.email
                            )
                          }
                        />
                      </>
                    );
                  }
                  return (
                    <ShipmentEntry
                      shipment={item}
                      navigation={navigation}
                      clientData={
                        clients &&
                        clients.find((client) => item.client === client.email)
                      }
                    />
                  );
                }}
                keyExtractor={(item) => item.pi}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                // onEndReachedThreshold={0.01}
                // onEndReached={() => loadMoreShipment()}
                // ListFooterComponent={
                //   loader && <Spinner size="small" status="primary" />
                // }
              />
            );
          })()
        )
      ) : (
        <View style={styles.loader}>
          <Spinner size="giant" status="basic" />
        </View>
      )}
    </LinearGradient>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    clients: userApi,
  };
};

export default connect(mapStateToProps, {
  getShipments,
  getMoreShipments,
  getUsers,
})(Dashboard);
