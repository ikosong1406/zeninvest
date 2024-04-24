import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import TransactionCard from "./TransactionCard";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const jsonData = [
  {
    type: "Deposit",
    amount: "10,000",
    date: "18 oct 2020",
    time: "7:40 am",
    amountInWords: "Ten Thousand Dollars",
  },
  {
    type: "Withdrawal",
    amount: "50,000",
    date: "20 oct 2020",
    time: "10:40 am",
    amountInWords: "Fifty Thousand Dollars",
  },
];

const Transaction = () => {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: width * 0.05,
          paddingTop: height * 0.04,
        }}
      >
        <TouchableOpacity onPress={back}>
          <FontAwesome5
            name="arrow-left"
            size={width * 0.06}
            color={Colors.slateGray}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginLeft: "30%",
            alignSelf: "center",
          }}
        >
          Transactions
        </Text>
      </View>

      <View
        style={{
          padding: width * 0.05,
          paddingTop: height * -0.04,
        }}
      >
        {jsonData.map((item, index) => (
          <TransactionCard key={index} data={item} />
        ))}
      </View>
    </SafeAreaView>
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

export default Transaction;
