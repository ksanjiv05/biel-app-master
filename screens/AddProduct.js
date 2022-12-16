import React from "react";
import { ScrollView, Text, View } from "react-native";
import CustomButton from "../common/components/CustomButton";
import InputField from "../common/components/InputField";
import { useFonts } from "expo-font";
import * as DocumentPicker from "expo-document-picker";
import { Icon, Button, ListItem, Spinner } from "@ui-kitten/components";
import design from "./AddShipment/common/design";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@ui-kitten/components";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { addProduct, updateProduct } from "../api/newProduct/productActions";

export default function AddProduct({ handleHeader, navigation, route }) {
  const { productData } = route.params;
  let initialState = () => ({
    name: productData ? productData["name"] : "",
    size: productData ? productData["size"] : "",
    price: productData ? String(productData["price"]) : 0,
    image: null,
  });
  let [product, setProduct] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);
  const [file, setFile] = React.useState("");

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);
  let [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
  });
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Add Product", ""); //to set header
    });
    return unsubscribe;
  }, [navigation]);

  const uploadImage = async () => {
    const doc = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    setFileSize(fileSize + doc.size);
    if (Math.round(fileSize / 1000000) > 100) {
      alert("files is greater then 100MB"); //set warning
      return;
    }
    if (doc.type == "success") {
      let fileBase64 = await FileSystem.readAsStringAsync(doc.uri, {
        encoding: "base64",
      });
      const fileId = uuid.v4();
      product["image"] = {
        id: fileId,
        name: doc.name,
        uri: doc.uri,
        type: "*/*",
        base64FileString: fileBase64,
      };
      setFileSelected(true);
      setFile(doc.name);
    } else {
      console.log("Somthing wrong"); //doc.error
    }
  };

  const handleDelete = () => {
    product["image"] = null;
    setFile("");
    setFileSelected(false);
  };

  const handleSubmit = (product) => {
    if (!product.image) {
      alert("Please choose article image");
      return;
    }
    setLoading(true);
    if (productData) {
      updateProduct(product, productData["_id"], (status) => {
        if (status) {
          navigation.navigate("PriceListNav", {
            screen: "PriceList",
          });
          setProduct(initialState());
        }
        setLoading(false);
      });
    } else {
      addProduct(product, (status) => {
        if (status) {
          navigation.navigate("PriceListNav", {
            screen: "PriceList",
          });
          setProduct(initialState());
        }
        setLoading(false);
      });
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: "Roboto", marginBottom: 8, fontSize: 18 }}>
            {productData ? `Edit Product` : `Add New Product`}
          </Text>
        </View>
        <InputField
          label={`Product Name`}
          value={product.name}
          onChangeText={(value) => setProduct({ ...product, name: value })}
        />
        <InputField
          label={`Grain Size`}
          value={product.size}
          onChangeText={(value) => setProduct({ ...product, size: value })}
        />
        <InputField
          label={`Price`}
          value={product.price}
          keyboardType={"numeric"}
          onChangeText={(value) => setProduct({ ...product, price: value })}
        />
        {!fileSelected ? (
          <Button
            size="medium"
            style={{ marginBottom: 25 }}
            onPress={() => uploadImage()}
            appearance="outline"
            status="primary"
            accessoryRight={(props) => (
              <Icon {...props} name="cloud-upload-outline" />
            )}
          >
            Upload Product image
          </Button>
        ) : (
          <ListItem
            title={() => <Text numberOfLines={1}>{file}</Text>}
            style={{ marginBottom: 25 }}
            accessoryLeft={(props) => <Icon {...props} name="image-outline" />}
            accessoryRight={() => (
              <Button
                size="medium"
                onPress={() => handleDelete()}
                appearance="ghost"
                status="danger"
                accessoryRight={(props) => (
                  <Icon {...props} name="trash-2-outline" />
                )}
              />
            )}
          />
        )}
        <CustomButton label={`Submit`} onPress={() => handleSubmit(product)} />
        {/* {productData ? (
          <CustomButton label={`Delete`} backgroundColor={`#FF0000`} />
        ) : null} */}
      </ScrollView>
    </View>
  );
}
