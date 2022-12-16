import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";

const movies = [
  { title: "Add Client" },
  { title: "Star Wars" },
  { title: "Back to the Future" },
  { title: "The Matrix" },
  { title: "Inception" },
  { title: "Interstellar" },
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

const ClientField = ({ navigation, styles }) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    index === 0
      ? navigation.navigate("AddClient")
      : setValue(data[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter((item) => filter(item, query)));
  };

  const clearInput = () => {
    setValue("");
    setData(movies);
  };

  const renderOption = (item, index) =>
    index === 0 ? null : (
      <AutocompleteItem key={index + 1} title={item.title} />
    );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      style={styles.autoCompleteFix}
      size="large"
      label="Client"
      placeholder="Name, Email or Phone..."
      value={value}
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      onSelect={onSelect}
    >
      <AutocompleteItem
        key={0}
        title="Add Client"
        style={styles.autoCompleteItemAction}
        accessoryLeft={(props) => <Icon {...props} name="plus" />}
      />
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default ClientField;
