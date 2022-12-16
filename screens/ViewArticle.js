import React from "react";
import { Text, useTheme, Spinner } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";
import { WebView } from "react-native-webview";
import moment from "moment";

const ViewArticle = ({ handleHeader, navigation, route }) => {
  const [loader, setLoader] = React.useState(false);
  const { article } = route.params;
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 18,
      marginVertical: 15,
      flex: 1,
    },
    featuredContainer: {
      flex: 1,
      flexDirection: "row",
    },

    featuredImageContainer: {
      borderRadius: 10,
    },
    featuredImage: {
      resizeMode: "cover",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    contentContainer: { flex: 2.5, paddingLeft: 10 },
    featuredText: {
      color: theme["color-danger-700"],
      marginTop: 10,
      fontSize: 16.5,
      fontWeight: "700",
    },
    featuredTextDesc: {
      color: theme["color-danger-500"],
      fontSize: 12,
      textAlign: "justify",
    },

    newsText: {
      backgroundColor: "transparent",
      marginTop: 5,
      fontSize: 13,
      color: theme["color-basic-600"],
    },
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("Article", "");
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // navigation.navigate("Newsfeed");
      // navigation.navigate("NewsArticleNav", {
      //   screen: "Newsfeed",
      //   params: {},
      // });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.featuredContainer}>
        <View
          style={{
            flex: 3,
            backgroundColor: "blue",
            borderRadius: 11,
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: "data:image/jpg;base64," + article.image,
            }}
            imageStyle={styles.featuredImageContainer}
            style={styles.featuredImage}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flex: 2 }}>
            <Text style={styles.featuredText}>{article.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.featuredTextDesc}>
              {"By: " + article.user.fname}
            </Text>
            <Text style={styles.featuredTextDesc}>
              {moment(article.date).format("llll").toString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 3, marginTop: 10, paddingBottom: 90 }}>
        <WebView
          originWhitelist={["*"]}
          source={{
            html: `<head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>
                    <body>${article.paragraph}</body>
                   </html>`,
          }}
          // source={{ html: item.paragraph,headers:' <meta name="viewport" content="width=device-width, initial-scale=1">' }}
          style={styles.newsText}
        />
      </View>
    </View>
  );
};

export default ViewArticle;
