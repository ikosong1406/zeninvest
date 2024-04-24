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

const TopStock = ({ data, index }) => {
  const navigation = useNavigation();

  const handleBoxClick = () => {
    navigation.navigate("StockDetails", { data, index });
  };

  return (
    <TouchableOpacity style={styles.box} onPress={handleBoxClick}>
      <Image
        source={{ uri: data.image }}
        style={{
          width: width * 0.11,
          height: height * 0.05,
          borderRadius: 10,
          backgroundColor: "#cdcccc",
        }}
      />
      <View style={{ marginLeft: width * 0.05 }}>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 14,
            color: Colors.slateGray,
          }}
        >
          {data.symbol}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 14,
            color: Colors.slateGray,
            marginTop: height * 0.005,
          }}
        >
          {data.price}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 12,
            color: "green",
            marginTop: height * 0.005,
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
    width: "45%",
    padding: width * 0.04,
    backgroundColor: "white",
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

export default TopStock;
