import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StockList1 = ({ data, index }) => {
  const navigation = useNavigation();

  const handleBoxClick = () => {
    navigation.navigate("StockDetails", { data, index });
  };
  return (
    <TouchableOpacity style={styles.box} onPress={handleBoxClick}>
      <Image
        source={{ uri: data.image }}
        style={{
          width: width * 0.15,
          height: height * 0.07,
          borderRadius: 10,
          backgroundColor: "#cdcccc",
        }}
      />
      <View style={{ marginLeft: width * 0.1 }}>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          {data.companyName}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          ${data.price}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: "red",
          }}
        >
          {data.changes}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: width * 0.04,
    backgroundColor: "white",
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default StockList1;
