import React from "react";
import { View } from "react-native";
import { Button, Icon, Spinner } from "@ui-kitten/components";

import Error from "./Error";

const Footer = ({
  styles,
  handleBack,
  handleSubmit,
  shipment,
  page,
  error,
  loader,
}) => {
  const LeftIcon = (props) => <Icon {...props} name="arrowhead-left-outline" />;
  const RightIcon = (props) => (
    <Icon {...props} name="arrowhead-right-outline" />
  );

  return (
    <>
      {error && <Error error={error} styles={styles} />}
      <View style={styles.footerContainer}>
        {/* <View {...props} style={styles.footerContainer}> */}
        <Button
          style={styles.footerBtn}
          size="large"
          appearance="ghost"
          status="basic"
          onPress={() => handleBack()}
          accessoryLeft={LeftIcon}
        >
          Back
        </Button>
        <Button
          style={styles.footerBtn}
          status="primary"
          size="large"
          onPress={() => handleSubmit(shipment)}
          accessoryRight={loader ? null : RightIcon}
        >
          {page === 1 ? "Next" : loader ? <Spinner status="basic" /> : "Submit"}
        </Button>
      </View>
    </>
  );
};

export default Footer;
