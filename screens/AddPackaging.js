import React from "react";
import { Text, View, ScrollView } from "react-native";
import InputField from "../common/components/InputField";
import { useFonts } from "expo-font";
import CustomButton from "../common/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { Icon, Button, ListItem, Spinner } from "@ui-kitten/components";
import design from "./AddShipment/common/design";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@ui-kitten/components";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import {
  addPackagingCost,
  updatePackagingCost,
  deletePackaging,
} from "../api/newPackagingCost/packagingAction";
import { connect } from "react-redux";

function AddPackaging({
  handleHeader,
  navigation,
  route,
  addPackagingCost,
  updatePackagingCost,
  deletePackaging,
}) {
  const { packagingData } = route.params;
  const [packagingCost, setPackagingCost] = React.useState({
    name: packagingData ? packagingData["name"] : "",
    size: packagingData ? packagingData["size"] : "",
    price: packagingData ? String(packagingData["price"]) : "",
    image: null,
  });
  const [fileSelected, setFileSelected] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);
  const [file, setFile] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);
  let [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Add Packaging Cost", ""); //to set header
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
      packagingCost["image"] = {
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
    packagingCost["packagingImage"] = null;
    setFile("");
    setFileSelected(false);
  };

  const handleSubmit = (packagingCost) => {
    if (!packagingCost.image) {
      alert("Please choose package image.");
      return;
    }
    setLoading(true);
    if (packagingData) {
      updatePackagingCost(packagingData["_id"], packagingCost, (status) => {
        if (status) {
          navigation.navigate("PriceListNav", {
            screen: "PackagingList",
          });
          setLoading(false);
        }
      });
    } else {
      addPackagingCost(packagingCost, (status) => {
        if (status) {
          navigation.navigate("PriceListNav", {
            screen: "PackagingList",
          });
          setLoading(false);
        }
      });
    }
  };

  const handlePackagingDelete = () => {
    if (packagingData) {
      setLoading(true);
      deletePackaging(packagingData["_id"], {}, (status) => {
        if (status) {
          navigation.navigate("PriceListNav", {
            screen: "PackagingList",
          });
        }
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
            {packagingData ? `Edit Packaging Cost` : `Add New Packaging Cost`}
          </Text>
        </View>
        <InputField
          label={`Packaging Material`}
          value={packagingCost.name}
          onChangeText={(value) =>
            setPackagingCost({ ...packagingCost, name: value })
          }
        />
        <InputField
          label={`Pack Size`}
          value={packagingCost.size}
          onChangeText={(value) =>
            setPackagingCost({ ...packagingCost, size: value })
          }
        />
        <InputField
          label={`Price`}
          keyboardType="numeric"
          value={packagingCost.price}
          onChangeText={(value) =>
            setPackagingCost({ ...packagingCost, price: value })
          }
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
            Upload Packaging image
          </Button>
        ) : (
          <ListItem
            title={() => <Text numberOfLines={1}>{file}</Text>}
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
        <CustomButton
          label={`Submit`}
          onPress={() => handleSubmit(packagingCost)}
        />
        {/* {packagingData ? (
          <CustomButton label={`Delete`} onPress={() => handlePackagingDelete()} backgroundColor={`#FF0000`} />
        ) : null} */}
      </ScrollView>
    </View>
  );
}

export default connect(null, {
  addPackagingCost,
  updatePackagingCost,
  deletePackaging,
})(AddPackaging);
