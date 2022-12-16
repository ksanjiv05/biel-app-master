import React from "react";
import { connect } from "react-redux";
import { Text, useTheme, Avatar, Icon, Divider } from "@ui-kitten/components";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { getArticles } from "../api/newsArticle/newsArticleActions";
import { getCurrentUser } from "../api/user/userActions";
import { WebView } from "react-native-webview";
import moment from "moment";

const featuredImage = require("../assets/featured.jpg");

const NewsFeed = ({
  handleHeader,
  navigation,
  articleList,
  getArticles,
  getCurrentUser,
}) => {
  const [page, setPage] = React.useState(1);
  const [loader, setLoader] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 18,
      marginVertical: 15,
    },
    featuredContainer: {
      // marginBottom: 40,
      width: Dimensions.get("screen").width - 70,
      marginLeft: 5,
      paddingBottom: 17,
      height: 210,
    },
    newsCat: {
      color: theme["color-danger-700"],
      fontWeight: "700",
    },
    featuredImageContainer: {
      borderRadius: 10,
      marginTop: 5,
    },
    featuredImage: {
      resizeMode: "cover",
      justifyContent: "center",
      height: 160,
    },
    contentContainer: {
      position: "absolute",
      borderRadius: 10,
      top: 5,
      height: "100%",
      width: "100%",
      backgroundColor: theme["color-primary-transparent-600"],
      justifyContent: "flex-end",
      padding: 10,
    },
    featuredText: {
      color: "white",
      fontSize: 16.5,
      fontWeight: "700",
    },
    featuredTextDesc: {
      color: theme["color-danger-200"],
      fontSize: 12,
    },
    newsContainer: {
      backgroundColor: "transparent",
      // borderRadius: 10,
      // padding: 10,
      marginVertical: 20,
      flexDirection: "row",
      alignItems: "center",
      // borderWidth: 0.5,
    },
    newsImage: {
      marginRight: 10,
    },
    newsAvatar: {
      width: 90,
      height: 90,
      borderRadius: 10,
    },
    newsContent: {
      flexShrink: 1,
    },
    newsHeading: {
      fontWeight: "700",
      fontSize: 14,
    },
    newsText: {
      backgroundColor: "transparent",
      marginTop: 5,
      fontSize: 13,
      color: theme["color-basic-600"],
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    newsTextDesc: {
      color: theme["color-danger-600"],
      fontSize: 12,
    },
    icon: {
      height: 15,
      width: 15,
      marginRight: 3,
    },
    editIcon: {
      height: 15,
      width: 15,
      marginRight: 3,
      alignItems: "flex-end",
      textAlign: "right",
      padding: 10,
      backgroundColor: "green",
      borderRadius: 3,
    },
  });

  // const rendeHtml = (content)=>`<html>
  //                         <head>
  //                           <meta name="viewport" content="width=device-width, initial-scale=1">
  //                         </head>
  //                           <body>${content}</body>
  //                         </html>`
  //   }

  React.useEffect(() => {
    setLoader(true);
    getArticles({ page }, () => {
      //TODO: need to implement pagination v0.0.2
      setLoader(false);
      setPage(page + 1);
    });
  }, []);

  const edit = (item) => {
    if (!isAdmin) return;
    navigation.navigate("NewsArticleNav", {
      screen: "AddArticle",
      params: {
        articleData: item,
      },
    });
  };

  const checkAdmin = () => {
    getCurrentUser({}, (currentUser) => {
      setIsAdmin(currentUser && currentUser.user.role == "Admin");
    });
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleHeader("News Feed", "");
      checkAdmin();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <View style={{paddingBottom:100}}> */}

      {loader ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Loading....</Text>
        </View>
      ) : articleList.length < 1 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.inactiveText}>No articles found.</Text>
        </View>
      ) : (
        <>
          <Text category="h6" style={styles.newsCat}>
            FEATURED
          </Text>
          <ScrollView horizontal={true} style={{ height: 220 }}>
            {articleList
              .filter((article) => {
                if (article.featured) return article;
              })
              .map((article, index) => {
                return (
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("Article", { article: article })
                    }
                    activeOpacity={0.1}
                    underlayColor="transparent"
                    style={{ backgroundColor: "transparent" }}
                    key={index}
                  >
                    <View style={styles.featuredContainer}>
                      <ImageBackground
                        // source={featuredImage}
                        source={{
                          uri: "data:image/jpg;base64," + article.image,
                        }}
                        imageStyle={styles.featuredImageContainer}
                        style={styles.featuredImage}
                      >
                        <View style={styles.contentContainer}>
                          <Text style={styles.featuredText}>
                            {article.title}
                          </Text>
                          <Text style={styles.featuredTextDesc}>
                            {"By: " +
                              article.name +
                              " | " +
                              moment(article.date).format("llll").toString()}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableHighlight>
                );
              })}
          </ScrollView>

          <Text category="h6" status="danger" style={styles.newsCat}>
            NEWS UPDATES
          </Text>
          <FlatList
            style={{ marginBottom: 380 }}
            data={articleList.filter((article) => {
              if (!article.featured) return article;
            })}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("Article", { article: item })
                    }
                    // key={index}
                    activeOpacity={0.1}
                    underlayColor="transparent"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <View style={styles.newsContainer}>
                      <View style={styles.newsImage}>
                        <Avatar
                          style={styles.newsAvatar}
                          shape="square"
                          //source={require("../assets/art1.jpg")}
                          source={{
                            uri: "data:image/jpg;base64," + item.image,
                          }}
                        />
                      </View>
                      <View style={styles.newsContent}>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={styles.newsHeading}
                            onPress={() => {
                              if (!isAdmin) return;
                              edit(item);
                            }}
                          >
                            {item.title}
                          </Text>
                          {isAdmin ? (
                            <TouchableHighlight onPress={() => edit(item)}>
                              <Icon
                                style={styles.editIcon}
                                fill="white"
                                name="edit-2-outline"
                              />
                            </TouchableHighlight>
                          ) : (
                            <></>
                          )}
                        </View>
                        {/* <Text style={styles.newsText}> */}
                        <View style={{ minHeight: 40 }}>
                          <WebView
                            originWhitelist={["*"]}
                            source={{
                              html: `<head>
                                      <meta name="viewport" content="width=device-width, initial-scale=1">
                                      </head>
                                      <body>${item.paragraph}</body>
                                     </html>`,
                            }}
                            // source={{ html: item.paragraph,headers:' <meta name="viewport" content="width=device-width, initial-scale=1">' }}
                            style={styles.newsText}
                          />
                        </View>
                        {/* {item.paragraph} */}
                        {/* </Text> */}

                        <View style={styles.timeContainer}>
                          <Icon
                            style={styles.icon}
                            fill="black"
                            name="clock-outline"
                          />
                          <Text style={styles.newsTextDesc}>
                            {"By: " +
                              item.name +
                              " | " +
                              moment(item.date).format("llll").toString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                  <Divider />
                </>
              );
            }}
            keyExtractor={(item) => item.artId}
            // onEndReachedThreshold={0.01}
            // onEndReached={() => loadMoreShipment()}
            // ListFooterComponent={
            //   loader && <Spinner size="small" status="primary" />
            // }
          />
        </>
      )}
    </View>
  );
};

const mapStateToProps = ({ articleApi }) => {
  return {
    articleList: articleApi,
  };
};

export default connect(mapStateToProps, { getArticles, getCurrentUser })(
  NewsFeed
);
