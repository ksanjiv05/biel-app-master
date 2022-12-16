import React from "react";
import { connect } from "react-redux";
import { Autocomplete, AutocompleteItem, Layout } from "@ui-kitten/components";
import { getShipmentDetails } from "../../../../api/shipment/shipmentActions";

const movies = [
  { title: "Star Wars" },
  { title: "Back to the Future" },
  { title: "The Matrix" },
  { title: "Inception" },
  { title: "Interstellar" },
];

const filter = (item, query) =>
  item.brand.toLowerCase().includes(query.toLowerCase());

const BrandField = ({
  styles,
  handleChange,
  shipment,
  getShipmentDetails,
  pi,
  shipmentList,
}) => {
  const [value, setValue] = React.useState(shipment?.brand);
  const [order, setOrder] = React.useState([]);
  const [data, setData] = React.useState([]);

  const onSelect = (index) => {
    setValue(order[index].brand);
    const brand = order[index].brand;
    console.log("brand set ", brand);
    handleChange({ ...shipment, brand });
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(order.filter((item) => filter(item, query)));
  };

  const renderOption = (item, index) => {
    return (
      <AutocompleteItem
        key={index}
        title={item.brand}
        style={styles.autoCompleteItemAction}
      />
    );
  };

  React.useEffect(() => {
    const shipmentObj = shipmentList.find((shipment) => shipment.pi === pi);
    // console.log("ship--", shipmentObj);
    setData(shipmentObj.order);
    setOrder(shipmentObj.order);
    setValue(shipmentObj.order[0].brand);
  }, [shipmentList]);
  // React.useEffect(() => {
  //   getShipmentDetails({ pi }, () => {
  //     // setLoader(false);
  //     // setFetch(false);
  //   });
  // }, []);

  return (
    <Layout style={styles.input}>
      <Autocomplete
        placeholder="Choose your brand"
        size="large"
        style={[styles.autoCompleteFix, styles.itemBelowAutoCompleteFix]}
        value={value}
        onSelect={onSelect}
        onChangeText={onChangeText}
      >
        {data.map(renderOption)}
      </Autocomplete>
    </Layout>
  );
};

const mapStateToProps = ({ shipmentApi }) => {
  return {
    shipmentList: shipmentApi,
  };
};

export default connect(mapStateToProps, null)(BrandField);
