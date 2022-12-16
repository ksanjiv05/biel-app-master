import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Layout, Icon, Text, Button, ListItem } from "@ui-kitten/components";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";

const FileUpload = ({ styles, shipment, theme, progress }) => {
  const [fileObj, setFileObj] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [fileSize, setFileSize] = React.useState(0);
  const [progressObj, setProgressObj] = React.useState({});

  const uploadDocument = async () => {
    const doc = await DocumentPicker.getDocumentAsync({ type: "*/*" });

    setFileSize(fileSize + doc.size);

    if (Math.round(fileSize / 1000000) > 100) {
      alert("files is greater then 100MB"); //set warning
      return;
    }

    if (doc.type == "success") {
      const fileId = uuid.v4();

      setCount(count + 1);

      setProgressObj({
        [fileId]: 0,
        ...progressObj,
      });

      setFileObj((previousObj) => [
        ...previousObj,
        {
          id: fileId,
          name: doc.name,
          uri: doc.uri,
          type: "*/*",
          // base64FileString: fileBase64,
        },
      ]);

      shipment.document.push({
        id: fileId,
        name: doc.name,
        uri: doc.uri,
        type: "*/*",
        // base64FileString: fileBase64,
      });
    } else {
      console.log("Somthing wrong"); //doc.error
    }
  };

  const handleDelete = (id) => {
    const updatedFileObj = fileObj.filter((obj) => obj.id != id);

    setFileObj(updatedFileObj);

    shipment.document = updatedFileObj;
  };

  React.useEffect(() => {
    if (progress.id) {
      setProgressObj({
        ...progressObj,
        [progress.id]: progress.progress * 1,
      });
    }
  }, [progress]);

  return (
    <>
      <TouchableOpacity onPress={() => uploadDocument()}>
        <Layout style={[styles.input, styles.uploadArea]}>
          <Icon
            style={styles.uploadIcon}
            name="archive"
            fill={theme["color-basic-400"]}
          />

          <Text category="p1">Upload Document </Text>

          <Text category="p2" appearance="hint">
            pdf, jpg, doc, xls (less then 25MB)
          </Text>
        </Layout>
      </TouchableOpacity>

      <ScrollView style={{ maxHeight: 150 }}>
        {/* TODO max height should not be static */}
        {fileObj.map((obj) => (
          <View key={obj.id}>
            {/* TODO change listitem to card to improve visibility of attached files
            provide a way to cancel upload in between */}
            <ListItem
              title={() => <Text numberOfLines={1}>{obj.name}</Text>}
              accessoryLeft={(props) => (
                <Icon {...props} name="file-text-outline" />
              )}
              accessoryRight={() => (
                <Button
                  size="medium"
                  onPress={() => handleDelete(obj.id)}
                  appearance="ghost"
                  status="danger"
                  accessoryRight={(props) => (
                    <Icon {...props} name="trash-2-outline" />
                  )}
                />
              )}
            />
            <View
              style={[styles.progressBar, { width: `${progressObj[obj.id]}%` }]}
            />
            {/* <View style={{ width: getProgressWidth(obj.id) }} /> */}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default FileUpload;
