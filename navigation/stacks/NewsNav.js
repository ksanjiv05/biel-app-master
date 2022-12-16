import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import NewsFeed from "../../screens/NewsFeed";

import Header from "../../common/components/Header";
import ViewArticle from "../../screens/ViewArticle";

const Stack = createStackNavigator();

const NewsNav = ({ headerData, handleHeader }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    mainBg: {
      flex: 1,
    },
  });

  return (
    <Stack.Navigator
      style={styles.mainBg}
      mode="modal"
      screenOptions={{
        header: (props) => <Header headerData={headerData} {...props} />,
      }}
      headerMode="float"
    >
      <Stack.Screen name="Newsfeed">
        {(props) => (
          <View style={styles.mainBg}>
            <NewsFeed {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Article">
        {(props) => (
          <View style={styles.mainBg}>
            <ViewArticle {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NewsNav;
