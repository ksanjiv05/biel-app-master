import React from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";

import countries from "./CountryField/countries";

const filter = (item, query) =>
  item.toLowerCase().includes(query.toLowerCase());

const CountryField = ({ styles, handleChange, countryName = "", shipment }) => {
  const [country, setCountry] = React.useState({
    Name: countryName,
    Code: null,
  });
  const [data, setData] = React.useState(countries);

  const onSelect = (index) => {
    setCountry(data[index]);
    console.log("countery ", country);
    handleChange("country", data[index].Name);
  };

  const onChangeText = (query) => {
    setCountry({ Name: query, Code: null });
    setData(countries.filter((item) => filter(item.Name, query)));
  };

  const clearInput = () => {
    setCountry(null);
    setData(countries);
  };

  React.useEffect(() => {
    setCountry({ Name: shipment && shipment.country, Code: null });
  }, [shipment]);

  const renderCountryIcon = (code) => (
    <Image
      style={styles.flag}
      source={{
        uri: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
      }}
    />
  );

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.Name}
      accessoryLeft={() => renderCountryIcon(item.Code)}
    />
  );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      style={[styles.autoCompleteFix, styles.itemBelowAutoCompleteFix]}
      size="large"
      label="Country"
      placeholder="Select Country"
      value={country ? country.Name : ""}
      accessoryRight={renderCloseIcon}
      accessoryLeft={
        country
          ? country.Code
            ? () => renderCountryIcon(country.Code)
            : null
          : null
      }
      onSelect={onSelect}
      onChangeText={(nextValue) => onChangeText(nextValue)}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default CountryField;
