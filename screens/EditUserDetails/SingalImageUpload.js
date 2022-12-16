import React from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, Text, Button, ListItem } from "@ui-kitten/components";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";

const SingalImageUpload = ({ styles, client }) => {
  const [fileSelected, setFileSelected] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);
  const [file, setFile] = React.useState("");

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
      // console.log(fileBase64.length);

      const fileId = uuid.v4();

      // setProgressObj({
      //   [fileId]: 0,
      //   ...progressObj,
      // });

      client["image"] = {
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
    client["image"] = null;
    setFile("");
    setFileSelected(false);
  };

  // React.useEffect(() => {
  //   if (progress.id) {
  //     setProgressObj({
  //       ...progressObj,
  //       [progress.id]: progress.progress * 1,
  //     });
  //   }
  // }, [progress]);

  return !fileSelected ? (
    <Button
      size="medium"
      style={styles.input}
      onPress={() => uploadImage()}
      appearance="outline"
      status="primary"
      accessoryRight={(props) => (
        <Icon {...props} name="cloud-upload-outline" />
      )}
    >
      upload image
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
          accessoryRight={(props) => <Icon {...props} name="trash-2-outline" />}
        />
      )}
    />
  );
};

export default SingalImageUpload;
