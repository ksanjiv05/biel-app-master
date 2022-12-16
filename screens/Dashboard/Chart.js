import React from "react";
import { View } from "react-native";
import {
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  LineSegment,
} from "victory-native";
import { connect } from "react-redux";
import { currencyData } from "../../api/shipment/shipmentActions";

const Chart = ({ theme }) => {
  return (
    <VictoryChart
      domainPadding={{ y: [20, 0] }}
      padding={{ left: 30, right: 30, top: 40, bottom: 40 }}
      height={200}
    >
      <VictoryAxis
        domain={[1, 8]}
        standalone={true}
        style={{
          axis: { stroke: "none" },
          tickLabels: { fill: theme["color-basic-700"] },
        }}
        gridComponent={<LineSegment />}
      />
      <VictoryGroup
        data={[
          { x: "Jan", y: 5 },
          { x: "Feb", y: 3 },
          { x: "Mar", y: 4 },
          { x: "Apr", y: 6 },
          { x: "May", y: 7 },
          { x: "June", y: 5 },
          { x: "July", y: 6 },
          { x: "Aug", y: 7 },
        ]}
      >
        <VictoryLine
          animate={{
            duration: 200,
            onLoad: { duration: 500 },
          }}
          style={{
            data: { stroke: theme["color-basic-200"] },
          }}
        />
        <VictoryScatter
          size={7}
          style={{ data: { fill: theme["color-basic-700"] } }}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};
// import moment from "moment";
// const Chart = ({ theme, currencyData }) => {
//   const [currency, setCurrency] = React.useState({});
//   console.log(moment().subtract(1, "days").format("YYYY-MM-DD"));
//   React.useEffect(() => {
//     currencyData({}, (currencies) => {
//       if (currencies) setCurrency(currencies);
//       console.log("shipment act 67 ", currencies);
//     });
//   }, []);

//   const renderGraph = (key, index) => {
//     return (
//       <VictoryArea
//         key={index}
//         style={{
//           data: {
//             fill: "transparent",
//             stroke: theme["color-basic-700"],
//           },
//         }}
//         interpolation="cardinal"
//         // [{
//         //   "USD_PHP": 46.211,
//         //   "PHP_USD": 0.02163987
//         // }]
//         data={[
//           {
//             x: moment().format("ddd").toUpperCase().toString(),
//             y: currency[key][moment().format("YYYY-MM-DD").toString()],
//           },
//           {
//             x: moment()
//               .subtract(1, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(1, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//           {
//             x: moment()
//               .subtract(2, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(2, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//           {
//             x: moment()
//               .subtract(3, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(3, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//           {
//             x: moment()
//               .subtract(4, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(4, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//           {
//             x: moment()
//               .subtract(5, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(5, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//           {
//             x: moment()
//               .subtract(6, "days")
//               .format("ddd")
//               .toUpperCase()
//               .toString(),
//             y: currency[key][
//               moment().subtract(6, "days").format("YYYY-MM-DD").toString()
//             ],
//           },
//         ]}
//       />
//     );
//   };
//   return (
//     <>
//       <View style={{ width: "100%", height: 210, display: "flex" }}>
//         <View
//           style={{
//             width: "100%",
//             height: 50,
//             // backgroundColor: "red",
//             alignItems: "flex-end",
//             justifyContent: "flex-end",
//             position: "absolute",
//           }}
//         >
//           <View
//             style={{
//               width: 100,
//               height: 50,
//               backgroundColor: "blue",
//               borderRadius: 10,
//             }}
//           ></View>
//         </View>
//         <VictoryChart
//           domainPadding={{ y: [20, 0] }}
//           padding={{ left: 30, right: 30, top: 40, bottom: 40 }}
//           height={200}
//         >
//           <VictoryGroup
//             style={{
//               data: { strokeWidth: 3, fillOpacity: 0.4 },
//             }}
//           >
//             {currency && currency != undefined ? (
//               Object.keys(currency).map((key, index) => renderGraph(key, index))
//             ) : (
//               // <VictoryArea
//               //   style={{
//               //     data: {
//               //       fill: "transparent",
//               //       stroke: theme["color-basic-700"],
//               //     },
//               //   }}
//               //   interpolation="cardinal"
//               //   // [{
//               //   //   "USD_PHP": 46.211,
//               //   //   "PHP_USD": 0.02163987
//               //   // }]
//               //   data={[
//               //     {
//               //       x: moment().format("ddd").toUpperCase().toString(),
//               //       y: currency?.USD_INR[
//               //         moment().format("YYYY-MM-DD").toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(1, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(1, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(2, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(2, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(3, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(3, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(4, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(4, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(5, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(5, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //     {
//               //       x: moment()
//               //         .subtract(6, "days")
//               //         .format("ddd")
//               //         .toUpperCase()
//               //         .toString(),
//               //       y: currency?.USD_INR[
//               //         moment()
//               //           .subtract(6, "days")
//               //           .format("YYYY-MM-DD")
//               //           .toString()
//               //       ],
//               //     },
//               //   ]}
//               // />
//               <></>
//             )}
//             {/* <VictoryArea
//               style={{
//                 data: {
//                   fill: "transparent",
//                   stroke: theme["color-primary-400"],
//                 },
//               }}
//               interpolation="cardinal"
//               data={[
//                 { x: "SUN", y: 0.08 },
//                 { x: "MON", y: 0.03 },
//                 { x: "TUE", y: 0.04 },
//                 { x: "WED", y: 0.09 },
//                 { x: "THR", y: 0.05 },
//                 { x: "FRI", y: 0.02 },
//                 { x: "SAT", y: 0.1 },
//                 // { x: "May", y: 7 },
//                 // { x: "June", y: 5 },
//                 // { x: "July", y: 6 },
//                 // { x: "Aug", y: 7 },
//               ]}
//             /> */}
//           </VictoryGroup>
//         </VictoryChart>
//       </View>
//     </>
//   );
// };

export default Chart;
