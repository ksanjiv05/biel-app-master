import React from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, Text, Button, ListItem } from "@ui-kitten/components";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const ArticleImageUploadX = ({ styles, article }) => {
  const [fileSelected, setFileSelected] = React.useState(false);
  const [fileSize, setFileSize] = React.useState(0);
  const [file, setFile] = React.useState("");
  const [progressObj, setProgressObj] = React.useState({});

  const uploadImage = async () => {
    const doc = await DocumentPicker.getDocumentAsync({ type: "*/*" });

    setFileSize(fileSize + doc.size);

    if (Math.round(fileSize / 1000000) > 100) {
      alert("files is greater then 100MB"); //set warning
      return;
    }

    if (doc.type == "success") {
      //   let fileBase64 = await FileSystem.readAsStringAsync(doc.uri, {
      //     encoding: "base64",
      //   });
      // console.log(fileBase64.length);

      const fileId = uuid.v4();

      //   article["image"] = {
      //     id: fileId,
      //     name: doc.name,
      //     uri: doc.uri,
      //     type: "*/*",
      //     base64FileString: fileBase64,
      //   };

      const formData = new FormData();
      formData.append("file", {
        uri: doc.uri,
        name: doc.name,
        type: "*/*",
      });

      formData.append("data1", "hii sanjiv");
      formData.append("data2", "hii vinay");

      axios
        .post("http://134.255.216.211:5000/file", formData)
        .then((res) => {
          console.log("form data res", res.data);
        })
        .catch((err) => {
          console.log("form data error", err);
        });
    } else {
      console.log("Somthing wrong"); //doc.error
    }
  };

  const handleDelete = () => {
    article["image"] = null;
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
      upload article image
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

export default ArticleImageUploadX;
