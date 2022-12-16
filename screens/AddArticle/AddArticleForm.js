import React from "react";
import { Divider, Icon, CheckBox, Input } from "@ui-kitten/components";
import { View } from "react-native";
import Editor from "./Editor";
import ArticleImageUpload from "./ArticleImageUpload";
import ArticleImageUploadX from "./FormDataUpload";

const AddArticleForm = ({ styles, handleChange, article, theme }) => {
  return (
    <>
      <Input
        style={styles.input}
        size="medium"
        placeholder="Enter the sutible title"
        label="Title"
        size="large"
        multiline={true}
        value={article.title}
        // textStyle={{ minHeight: 64 }}
        onChangeText={(title) => handleChange({ ...article, title })}
      />
      <Input
        style={styles.input}
        size="medium"
        placeholder="Enter the author name"
        label="Author Name"
        size="large"
        multiline={true}
        value={article.name}
        // textStyle={{ minHeight: 64 }}
        onChangeText={(name) => handleChange({ ...article, name })}
      />
      <ArticleImageUpload
        styles={styles}
        handleChange={handleChange}
        article={article}
        theme={theme}
      />
      {/* <ArticleImageUploadX
        styles={styles}
        handleChange={handleChange}
        article={article}
        theme={theme}
      /> */}
      <CheckBox
        style={styles.input}
        checked={article.featured}
        onChange={(featured) => handleChange({ ...article, featured })}
      >
        {`FEATURED`}
      </CheckBox>
      {/* <Divider style={styles.divider} /> */}
      <View style={[styles.input, { flex: 1, minHeight: 400 }]}>
        <Editor
          handleChange={handleChange}
          article={article}
          theme={theme}
          progress={10}
        />
      </View>
    </>
  );
};

export default AddArticleForm;
