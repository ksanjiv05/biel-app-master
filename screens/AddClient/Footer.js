import React from "react";
import { View } from "react-native";
import { Button, Icon } from "@ui-kitten/components";

const Footer = ({ styles, setWarning, handleSubmit, client, page }) => {
  const LeftIcon = (props) => <Icon {...props} name="arrowhead-left-outline" />;
  const RightIcon = (props) => (
    <Icon {...props} name="arrowhead-right-outline" />
  );

  return (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerBtn}
        size="large"
        appearance="ghost"
        status="basic"
        onPress={() => setWarning(true)}
        accessoryLeft={LeftIcon}
      >
        Back
      </Button>
      <Button
        style={styles.footerBtn}
        status="primary"
        size="large"
        onPress={() => handleSubmit(client)}
        accessoryRight={RightIcon}
      >
        Submit
      </Button>
    </View>
  );
};

export default Footer;
