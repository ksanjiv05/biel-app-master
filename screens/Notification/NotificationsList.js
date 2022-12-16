import React from "react";
import { View, ScrollView, FlatList, RefreshControl } from "react-native";
import NotificationCard from "./NotificationCard";

const NotificationsList = ({ styles, data, refreshList }) => {
  return (
    <ScrollView style={styles.notificationListCon}>
      {data && data.notificationData != undefined ? (
        // data?.notificationData.map((notification) => {
        //   return (
        //     <NotificationCard
        //       styles={styles}
        //       key={notification._id}
        //       title={notification.title}
        //       createdAt={notification.createdAt}
        //       message={notification.message}
        //     />
        //   );
        // })
        <FlatList
          data={data?.notificationData.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })}
          renderItem={({ item, index }) => {
            return (
              <NotificationCard
                styles={styles}
                title={item.title}
                createdAt={item.createdAt}
                message={item.message}
              />
            );
          }}
          keyExtractor={(item) => item._id}
          refreshing={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          onRefresh={() => {
            console.log("i am refresed");
            refreshList();
          }}
        />
      ) : (
        <></>
      )}
      {/* <NotificationCard styles={styles} /> */}
    </ScrollView>
  );
};
export default NotificationsList;
