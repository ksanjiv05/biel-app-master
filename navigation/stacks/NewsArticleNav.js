import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import AddArticle from "../../screens/AddArticle";
import Header from "../../common/components/Header";

const Stack = createStackNavigator();

const NewsArticleNav = ({ headerData, handleHeader }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    mainBg: {
      flex: 1,
      backgroundColor: theme["color-primary-500"],
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
      
      <Stack.Screen name="AddArticle">
        {(props) => (
          <View style={styles.mainBg}>
            <AddArticle {...props} handleHeader={handleHeader} />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NewsArticleNav;
