import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { packagingData } from "../utils/priceData";
import { Icon, Input } from "@ui-kitten/components";
import ListItem from "../common/components/ListItem";
import photo from "../assets/packaging.jpg";
import { getAllPackagingCost } from "../api/newPackagingCost/packagingAction";
import { connect } from "react-redux";

function PackagingList({ handleHeader, navigation, getAllPackagingCost }) {
  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
  const [searchResult, setSearchResult] = React.useState([]);
  const [search, setSearch] = React.useState("");
  let [packagingCostData, setPackagingCost] = React.useState(packagingData);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Packaging Cost", "");
      getAllPackagingCost({}, (packaging) => {
        if(packaging){
          setPackagingCost(packaging);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const searchHandler = (searchTerm) => {
    setSearch(searchTerm);
    console.warn(search);
    if (search !== undefined && search !== "") {
      const newPriceList = packagingData.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newPriceList);
    } else {
      setSearchResult(packagingData);
    }
  };

  const showList = (list) =>
    list.map((item, index) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PriceListNav", {
            screen: "AddPackaging",
            params: { packagingData: item },
          });
        }}
      >
        <ListItem
          product={item.name}
          size={item.size}
          price={item.price}
          photo={item.image ? {uri : "data:image/jpg;base64," + item.image} : photo}
        />
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6EEDF" }}>
      <View style={{ marginBottom: 25, marginTop: 20, paddingHorizontal: 20 }}>
        <Input
          style={{
            borderRadius: 15,
            backgroundColor: "#fff",
            height: 25,
            fontFamily: "Roboto-Medium",
          }}
          type="text"
          value={search}
          placeholder="Type keyword ..."
          accessoryRight={SearchIcon}
          onChangeText={(value) => searchHandler(value)}
        />
      </View>
      <View style={{ borderWidth: 0.5, borderColor: "#64402A" }} />
      <ScrollView style={{ padding: 20, marginBottom: 10 }}>
        {search.length > 1
          ? showList(searchResult)
          : showList(packagingCostData)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(null, { getAllPackagingCost })(PackagingList);
