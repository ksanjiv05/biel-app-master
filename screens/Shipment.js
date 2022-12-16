import React from "react";
import { View, ScrollView } from "react-native";
import {
  Card,
  Button,
  Text,
  useTheme,
  Spinner,
  Icon,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import Slider from "../common/components/Slider";
import Timeline from "../common/components/Timeline";
import design from "./Shipment/design";
import Client from "./Shipment/Client";
import ShipmentCard from "./Shipment/ShipmentCard";
import timelineData from "./Shipment/timelineData";
import { getShipmentDetails } from "../api/shipment/shipmentActions";
import { getUsers } from "../api/user/userActions";
import MiddelMenDetails from "./Shipment/MiddelMenDetails";
import { useIsFocused } from "@react-navigation/native";
// import formStep from "../config/formStep.json";
// import Loader from "../common/Loader";

const Shipment = ({
  route,
  navigation,
  getShipmentDetails,
  getUsers,
  handleHeader,
  shipmentList = [],
  userList = [],
}) => {
  const theme = useTheme();
  const styles = design(theme);
  const { pi, role } = route.params;
  const [loader, setLoader] = React.useState(true);
  const [timeLineLoader, setTimeLineLoader] = React.useState(true);
  const [shipment, setShipment] = React.useState(null);
  const [stageAction, setStageAction] = React.useState(
    "PackagingMatrialStatus"
  );
  const [buttonVisibility, setButtonVisibility] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setTimeLineLoader(true);
      handleHeader("Shipment", pi);
      // getShipmentDetails({ pi }, (status) => {
      //   setTimeLineLoader(false);
      // });
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setTimeLineLoader(false);
    setLoader(true);

    getShipmentDetails({ pi }, (status) => {
      if (status) {
        getUsers({}, (userStatus) => {
          setLoader(false);
        });
      }
    });
  }, [isFocused]);

  React.useEffect(() => {
    const shipmentObj = shipmentList.find((shipment) => shipment.pi === pi);
    setShipment(shipmentObj);
    return () => setShipment(null);
  }, [shipmentList]);

  React.useEffect(() => {
    // console.log(userList, "+++++userlist ++++");
    setUsers(userList);
  }, [userList]);
  const buttonText = (stage) => {
    switch (stage) {
      case 0:
        if (stageAction !== "PackagingMatrialStatus")
          setStageAction("PackagingMatrialStatus");

        return role == "Admin"
          ? "Packaging Matrial Status"
          : setButtonVisibility(false);

      case 1:
        if (stageAction !== "Schedule") {
          setStageAction("Schedule");
        }

        return "Schedule";
      case 2:
        if (stageAction !== "ProductionSchedule")
          setStageAction("ProductionSchedule");
        return role == "Admin"
          ? "Production Schedule"
          : setButtonVisibility(false);

      case 3:
        if (stageAction !== "DocumentStatus") setStageAction("DocumentStatus");
        return role == "Admin"
          ? "Add Document Status"
          : setButtonVisibility(false);

      case 4:
        if (stageAction !== "ShipmentSchedule")
          setStageAction("ShipmentSchedule");
        return role == "Admin"
          ? "Shipment Schedule Update"
          : setButtonVisibility(false);

      case 5:
        if (stageAction !== "DocumentDispatchStatus")
          setStageAction("DocumentDispatchStatus");
        return role == "Admin"
          ? "Add Document Dispatch Status"
          : setButtonVisibility(false);

      case 6:
        return setButtonVisibility(false);

      default:
        return "Add";
    }
  };

  const addStage = () => {
    navigation.navigate("ShipmentNav", {
      screen: stageAction,
      params: { pi },
    });
  };

  return loader ? (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Loading....</Text>
    </View>
  ) : (
    <Card disabled={true} style={styles.container}>
      <Slider navigation={navigation} destination={"Dashboard"} />

      <ScrollView style={styles.scrollView}>
        <Client
          navigation={navigation}
          styles={styles}
          shipmentData={shipment}
          users={users}
        />
        <MiddelMenDetails
          navigation={navigation}
          styles={styles}
          shipmentData={shipment}
          users={users}
        />

        <ShipmentCard
          styles={styles}
          shipmentData={shipment}
          navigation={navigation}
        />

        <Text category="h5">History</Text>

        <View style={styles.timelineContainer}>
          {timeLineLoader ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner />
            </View>
          ) : (
            <Timeline
              data={timelineData(shipment, styles, theme, navigation)}
              contentContainerStyle={styles.contentContainerStyle}
              timeContainerStyle={styles.timeContainerStyle}
              iconContainerStyle={styles.iconContainerStyle}
              touchable={true}
              pi={pi}
              navigation={navigation}
              role={role}
            />
          )}
        </View>

        {buttonVisibility ? (
          <Button
            status="basic"
            style={styles.addBtn}
            accessoryLeft={(props) => (
              <Icon
                {...props}
                style={styles.addBtnIcon}
                name="plus-circle-outline"
                fill={theme["color-basic-800"]}
              />
            )}
            onPress={addStage}
          >
            {buttonText(shipment.stage)}
          </Button>
        ) : (
          <></>
        )}
      </ScrollView>
    </Card>
  );
};

const mapStateToProps = ({ shipmentApi, userApi }) => {
  return {
    shipmentList: shipmentApi,
    userList: userApi,
  };
};

export default connect(mapStateToProps, { getShipmentDetails, getUsers })(
  Shipment
);
