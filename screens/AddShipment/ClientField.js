import React from "react";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";

import { getUsers } from "../../api/user/userActions";

const filter = (item, query) =>
  item.fname.toLowerCase().includes(query.toLowerCase());

const ClientField = ({
  navigation,
  styles,
  handleChange,
  users = [],
  getUsers,
  shipment,
}) => {
  const [value, setValue] = React.useState(null);
  const [clients, setClients] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getUsers({ user: "" });
  }, []);

  React.useEffect(() => {
    users && setClients(users.filter((user) => user.role === "Client"));
    users && setData(users.filter((user) => user.role === "Client"));
    setValue(shipment && shipment?.client);
  }, [users]);

  const onSelect = (index) => {
    if (index === 0) {
      navigation.navigate("AddClient");
    } else {
      setValue(data[index - 1].email);
      handleChange("client", data[index - 1].email);
    }
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(clients.filter((item) => filter(item, query)));
  };

  const clearInput = () => {
    setValue("");
    setData(users);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index + 1}
      title={item.email}
      style={styles.autoCompleteItemAction}
    >
      <Layout sytle={styles.clientList}>
        <Text>{item.email}</Text>
        <Text style={styles.clientSubTitle}>{item.company}</Text>
      </Layout>
    </AutocompleteItem>
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
      {data ? data.map(renderOption) : null}
    </Autocomplete>
  );
};

const mapStateToProps = ({ userApi }) => ({
  users: userApi,
});

export default connect(mapStateToProps, { getUsers })(ClientField);
