// only use to update shipment state
const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, shipment = {} } = action;
  switch (type) {
    case "addShipment":
      return [shipment, ...state];

    case "getShipments":
      return [...shipment];
    case "getAllShipments":
      return [...shipment];

    case "getShipmentDetails":
      let newState = [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi ? shipment : shipmentObj;
        }),
      ];
      state = newState;
      return state;
    case "packagingMatrialStatus":
      newState = [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? { ...shipmentObj, packagingMatrialStatus: shipment, stage: 1 }
            : shipmentObj;
        }),
      ];
      state = newState;
      return state;

    case "scheduleUpdate":
      newState = [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? { ...shipmentObj, scheduleUpdate: shipment, stage: 2 }
            : shipmentObj;
        }),
      ];
      state = newState;
      return state;

    case "productionScheduleUpdate":
      newState = [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? { ...shipmentObj, productionSchedule: shipment, stage: 3 }
            : shipmentObj;
        }),
      ];
      state = newState;
      return state;
    case "documentStatusUpdate":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? { ...shipmentObj, documentStatus: shipment, stage: 4 }
            : shipmentObj;
        }),
      ];

    case "shipmentScheduleUpdate":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? { ...shipmentObj, shipmentSchedule: shipment, stage: 5 }
            : shipmentObj;
        }),
      ];

    case "documentDispatchStatusUpdate":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.pi === shipment.pi
            ? {
                ...shipmentObj,
                documentDispatchStatus: shipment,
                stage: 6,
              }
            : shipmentObj;
        }),
      ];

    case "productionSchedule":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.formId === shipment.formId
            ? { ...shipmentObj, productionSchedule: shipment, stage: 7 }
            : shipmentObj;
        }),
      ];

    case "deliverySchedule":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.formId === shipment.formId
            ? { ...shipmentObj, deliverySchedule: shipment, stage: 8 }
            : shipmentObj;
        }),
      ];

    case "documentStatus":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.formId === shipment.formId
            ? { ...shipmentObj, documentStatus: shipment, stage: 9 }
            : shipmentObj;
        }),
      ];

    case "finalPayment":
      return [
        ...state.map((shipmentObj) => {
          return shipmentObj.formId === shipment.formId
            ? { ...shipmentObj, finalPayment: shipment, stage: 10 }
            : shipmentObj;
        }),
      ];

    default:
      return state;
  }
};

export default stateManager;
