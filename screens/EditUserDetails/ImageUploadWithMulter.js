import React from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, Text, Button, ListItem } from "@ui-kitten/components";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import axios from "axios";

const ImageUploadWithMulter = ({ styles, client }) => {
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
      const fileId = uuid.v4();

      let formData = new FormData();
      formData.append("file", {
        uri: doc.uri,
        name: doc.name,
        type: "*/*",
      });

      axios
        .post("http://134.255.216.211:5000/file", formData)
        .then((responce) => {
          console.log("responec", responce.data);
          //   client["image"] = {
          //     id: fileId,
          //     name: doc.name,
          //     uri: doc.uri,
          //     type: "*/*",
          //     base64FileString: fileBase64,
          //   };
        })
        .catch((error) => {
          console.log("err to upload image ", error);
        });
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

export default ImageUploadWithMulter;
