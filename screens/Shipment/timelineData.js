import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";

const timelineData = (shipment, styles, theme, navigation) => {
  const { date, quantity, rate, stage, pi } = shipment;
  const timelineData = [];

  // console.log("timeline shi+++++++++++++++++++++++++ ", shipment);
  // 1. shipment details
  // - PI no. Destination and client name
  // 2. Packing material
  // -selected option should come
  // 3. delivery Schedule form

  const timelineComponent = (title, descp, iconName, date) => ({
    title: ({ styles }) => (
      <View>
        <Text style={{ fontSize: 10, color: "#999", marginBottom: 7 }}>
          {moment(date).format("lll")}
        </Text>
        <Text
          style={[
            styles,
            { marginBottom: 0, color: theme["color-primary-500"] },
          ]}
        >
          {title}
        </Text>
      </View>
    ),
    description: {
      content: descp,
    },
    icon: {
      content: iconName,
      style: styles.iconStyle,
    },
  });

  for (let i = 0; i <= stage; i++) {
    switch (i) {
      case 0:
        timelineData.push(
          timelineComponent(
            "Shipment Created",
            `shipment PI  ${pi}`,
            "qrcode",
            date,
            styles
          )
        );
        break;

      case 1:
        const {
          artWorkApproved = false,
          artWorkUnderApproval = false,
          packagingMatrialReceived = false,
          underPrinting = false,
        } = shipment?.packagingMatrialStatus;
        // console.log("ship 0=======================", shipment);
        timelineData.push(
          timelineComponent(
            "PACKAGING MATERIAL STATUS",

            `${artWorkUnderApproval ? "Art Work Under Approval" : ""}
${artWorkApproved ? "Art Work Approved" : ""}
${underPrinting ? "Art Work Under Printing" : ""}
${packagingMatrialReceived ? "Packaging Matrial Recived" : ""}`,
            "pencil-square-o",
            date,
            styles
          )
        );
        break;

      case 2:
        const { dateScheduled, packsize, scheduleUpdate, quantity } =
          shipment?.scheduleUpdate;

        timelineData.push(
          timelineComponent(
            "SCHEDULE",
            `click to schedule your shipment `,
            // "work in progress",
            "object-ungroup",
            date,
            styles
          )
        );
        break;

      case 3:
        const { dispatchSchedule, productionSchedule } =
          shipment?.productionSchedule;
        timelineData.push(
          timelineComponent(
            `PRODUCTION AND DISPATCH SCHEDULE`,
            `dispatch schedule at ${moment(dispatchSchedule).format("lll")}
production schedule at ${moment(productionSchedule).format("lll")}`,

            "object-group",
            date,
            styles
          )
        );
        break;

      case 4:
        const { documentApproved, documentIssued, underApproval } =
          shipment?.documentStatus;
        timelineData.push(
          timelineComponent(
            `DOCUMENT STATUS`,
            `${underApproval ? "Under Approval" : ""}
${documentApproved ? "Document Approved" : ""}
${documentIssued ? "Document Issued" : ""}
            `,

            "dollar",
            date,
            styles
          )
        );
        break;

      case 5:
        const { estArrival, estDeparture, billLandingNo } =
          shipment?.shipmentSchedule;
        timelineData.push(
          timelineComponent(
            `SHIPMENT SCHEDULE`,
            `arrival at ${moment(estArrival).format("lll")}
departure at ${moment(estDeparture).format("lll")}
bill landing no. ${billLandingNo}`,
            // "work in progress",0
            "cubes",
            date,
            styles
          )
        );
        break;

      case 6:
        const {
          telex,
          toBank,
          toBuyer,
          dhl = "",
        } = shipment?.documentDispatchStatus;
        timelineData.push(
          timelineComponent(
            `DOCUMENTS DISPATCH STATUS`,
            `${telex ? "Art Work Under Approval" : ""}
${toBank ? "To Bank " : toBuyer ? "To Buyer " : ""}
DHL No.${dhl}`,

            "cube",
            date,
            styles
          )
        );
        break;

      default:
        break;
    }
  }

  return timelineData.length >= 1 ? timelineData : [];
};

export default timelineData;
