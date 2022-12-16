import React from "react";
import { Text } from "@ui-kitten/components";
// import { FancyAlert } from "react-native-expo-fancy-alerts";

const Error = ({ error, styles }) => {
  return (
    <Text status="danger" style={styles.errorMsg}>
      {error}
    </Text>
    // <FancyAlert
    //   visible={visible}
    //   icon={
    //     <View
    //       style={{
    //         flex: 1,
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor: "red",
    //         borderRadius: 50,
    //         width: "100%",
    //       }}
    //     >
    //       <Text
    //         onPress={() => setVisible(false)}
    //         style={{ color: "white", fontSize: 20 }}
    //       >
    //         X
    //       </Text>
    //     </View>
    //   }
    //   style={{ backgroundColor: "white" }}
    // >
    //   <Text style={{ marginTop: -16, marginBottom: 32 }}>{error}</Text>
    // </FancyAlert>
  );
};

export default Error;
