import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, useTheme, Input, Divider, Spinner } from "@ui-kitten/components";
import { connect } from "react-redux";

import design from "./AddShipment/common/design";
import Slider from "../common/components/Slider";
import Footer from "./AddShipment/common/Footer";
import ConfirmPopUp from "./AddShipment/common/ConfirmPopUp";
import Loader from "../common/components/Loader";
import {
  addArticle,
  updateArticle,
} from "../api/newsArticle/newsArticleActions";

import AddArticleForm from "./AddArticle/AddArticleForm";

const AddArticle = ({
  route,
  navigation,
  handleHeader,
  addArticle,
  updateArticle,
}) => {
  const { articleData } = route.params;
  const initialArticleState = () => ({
    title: "",
    featured: false,
    name: "",
    paragraph: "<div></div>",
    image: null,
  });

  const [warning, setWarning] = React.useState(false);
  const [article, setArticle] = React.useState(initialArticleState());
  const [loader, setLoader] = React.useState(false);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = design(insets, theme);

  const handleBack = () => {
    setWarning(false);
    navigation.navigate("Dashboard");
  };

  // navigation.navigate("ShipmentNav", {
  //   screen: stageAction,
  //   params: { formId },
  // });

  const handleSubmit = (article) => {
    if (!article.image) {
      alert("Please choose article image");
      return;
    }

    setLoader(true);
    if (articleData) {
      console.log("this article for update", articleData.artId);
      article.artId = articleData.artId;
      updateArticle(article, (status) => {
        console.log("update article", status);
        if (status) {
          setArticle(initialArticleState());
          navigation.navigate("NEWS");
        }

        setLoader(false);
      });

      return;
    } else {
      addArticle(article, (status) => {
        if (status) {
          navigation.navigate("NEWS");
          setArticle(initialArticleState());
        }
        setLoader(false);
      });
    }
  };

  const handleChange = (updateArticle) => {
    setArticle(updateArticle);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Add New Article", ""); //to set header
      if (articleData) {
        setArticle({
          title: articleData.title,
          name: articleData.name,
          paragraph: articleData.paragraph,
          featured: articleData.featured,
          image: null,
        });
      }
    });
    return unsubscribe;
  }, [navigation]);

  //23/12
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", () => {
  //     navigation.navigate("Dashboard");
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return loader ? (
    <Spinner />
  ) : (
    <>
      <ConfirmPopUp
        styles={styles}
        warning={warning}
        setWarning={setWarning}
        handleBack={handleBack}
      />

      {/* {loader ? (
        <Loader />
      ) : ( */}
      <Card
        disabled={true}
        style={styles.container}
        footer={() => (
          <Footer
            styles={styles}
            setWarning={setWarning}
            handleSubmit={handleSubmit}
            shipment={article}
            loader={loader}
            handleBack={handleBack}
            // error={error}
            // page={page}
          />
        )}
      >
        <Slider navigation={navigation} destination={"Dashboard"} />

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <AddArticleForm
            styles={styles}
            handleChange={handleChange}
            article={article}
            theme={theme}
          />
        </ScrollView>
      </Card>
      {/* )} */}
    </>
  );
};

export default connect(null, { addArticle, updateArticle })(AddArticle);
