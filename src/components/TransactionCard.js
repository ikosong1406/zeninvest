import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TransactionCard = ({ data, index }) => {
  const navigation = useNavigation();

  const handleBoxClick = () => {
    navigation.navigate("TransactionDetails", { data, index });
  };

  const iconName =
    data.type === "Deposit" ? "arrow-down-left" : "arrow-up-right";

  const iconColor = data.type === "Deposit" ? "green" : "red";

  return (
    <TouchableOpacity style={styles.box} onPress={handleBoxClick}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Feather
          name={iconName}
          size={width * 0.1}
          color="white"
          style={{ backgroundColor: iconColor, borderRadius: 100 }}
        />
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginLeft: "10%",
            alignSelf: "center",
          }}
        >
          {data.type}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "anta",
          fontSize: 18,
          color: Colors.slateGray,
          marginLeft: "10%",
          alignSelf: "center",
        }}
      >
        {data.amount}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  box: {
    padding: width * 0.05,
    backgroundColor: "white",
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TransactionCard;
