import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const Editor = ({ handleChange, article, theme }) => {
  const RichText = useRef();
  // const [article, setArticle] = useState("");

  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // console.log(
      //   "Toolbar click, selected items (insert end callback):",
      //   items
      // );
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text category="c1">Editor</Text>
      <RichEditor
        useContainer={false}
        disabled={false}
        containerStyle={styles.editor}
        style={styles.rich}
        ref={RichText}
        initialContentHTML={article.paragraph}
        placeholder={"Writing your news content"}
        onChange={(paragraph) => handleChange({ ...article, paragraph })}
        editorInitializedCallback={editorInitializedCallback}
      />
      <RichToolbar
        editor={RichText}
        style={[styles.richBar]}
        // style={{height:60}}
        selectedIconTint={"#2095F2"}
        disabledIconTint={"#bfbfbf"}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.removeFormat,
          actions.undo,
          actions.redo,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.blockquote,

          "customAction",
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.heading2]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
          ),
          [actions.heading3]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
          ),
          [actions.heading4]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
          ),
        }}
      />
    </ScrollView>
  );
};

export default Editor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 400,
  },
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    overflow: "visible",
  },
  richBar: {
    height: 50,
    // backgroundColor: "#F5FCFF",
  },
});
