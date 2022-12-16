import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { priceData } from "../utils/priceData";
import { Icon, Input } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import ListItem from "../common/components/ListItem";
import photo from "../assets/art1.jpg";
import { getProducts } from "../api/newProduct/productActions";
import { Logs } from "expo";
Logs.enableExpoCliLogging();

export default function PriceList({ handleHeader, navigation }) {
  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
  const [products, setProducts] = React.useState(priceData);
  const [searchResult, setSearchResult] = React.useState([]);
  const [search, setSearch] = React.useState("");

  let [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  React.useEffect(() => {
    const getall = getProducts({}, (product_list) => {
      setProducts(product_list);
    })
    return getall
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Price List", ""); //to set header
      getProducts({}, (product_list) => {
        setProducts(product_list);
      })
    });
    return unsubscribe;
  }, [navigation]);

  const searchHandler = (searchTerm) => {
    setSearch(searchTerm);
    console.log(search);
    if (search !== undefined && search !== "") {
      const newPriceList = products.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newPriceList);
    } else {
      setSearchResult(products);
    }
  };

  const showList = (list) =>
    list.map((item, index) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PriceListNav", {
            screen: "AddProduct",
            params: { productData: item },
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
        {search.length > 1 ? showList(searchResult) : showList(products)}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Please Note:</Text>
          <View style={{marginLeft: 10}}>
            <Text>{`\u25CB Delivery Terms: FOB MUNDRA`}</Text>
            <Text>{`\u25CB Crop Year: 2022`}</Text>
            <Text>{`\u25CB Packaging: 25 KG Non Woven Bag / 40 KG Jute Bag`}</Text>
            <Text>{`\u25CB Available Packaging Options: Jute, Pouch, PP Pack, Non Woven / Fabric & Jar in all sizes at extra cost`}</Text>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
