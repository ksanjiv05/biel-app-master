import { Input, Icon, useTheme, Spinner } from "@ui-kitten/components";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import ShipmentEntry from "./Dashboard/ShipmentEntry";
import { getAllShipments } from "../api/shipment/shipmentActions";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const Search = ({
  shipmentList,
  getAllShipments,
  navigation,
  handleHeader,
  clients,
}) => {
  const theme = useTheme();
  const [searchKeyword, setsearchKeyword] = React.useState("");
  const [filleredDatas, setFilleredDatas] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  const handleSearch = (keyword) => {
    // console.log(shipmentList);
    setsearchKeyword(keyword);
    if (shipmentList.length > 0) {
      const filteredData = shipmentList.filter((shipment) => {
        // console.log("----", shipment.pi);
        return (
          shipment.pi
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase()) ||
          shipment.client
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase()) ||
          shipment.country
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase()) ||
          shipment.broker
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase()) ||
          shipment.destinationPort
            .toLocaleLowerCase()
            .includes(keyword.toLocaleLowerCase())
        );
      });
      setFilleredDatas(filteredData);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Search", "");
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setLoader(true);
    getAllShipments({}, (status) => {
      setLoader(false);
    });
  }, []);

  const footer = () => {
    return loader ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </View>
    ) : (
      <></>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          // label='Password'
          placeholder="Type keyword ..."
          accessoryRight={SearchIcon}
          onChangeText={(keyword) => handleSearch(keyword)}
        />
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={searchKeyword.length > 1 ? filleredDatas : []}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (
                <>
                  <ShipmentEntry
                    shipment={item}
                    navigation={navigation}
                    clientData={
                      clients &&
                      clients.find((client) => item.client === client.email)
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
          ListFooterComponent={footer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
  },
  inputContainer: {
    height: 70,
    marginHorizontal: 18,
  },
  cardContainer: { flex: 1 },
});

const mapStateToProps = (state) => {
  return {
    shipmentList: state.shipmentApi,
    clients: state.userApi,
  };
};

export default connect(mapStateToProps, { getAllShipments })(Search);

//consigneeDetails destinationCountry portOfDischarge rate quality  variety
