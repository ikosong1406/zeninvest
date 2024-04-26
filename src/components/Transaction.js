import React, { useState, useEffect } from "react";
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
import BackendApi from "../api/BackendApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Transaction = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post(`${BackendApi}/userdata`, { token: token }).then((res) => {
      // console.log(res.data.data);
      setUserData(res.data.data);
    });
  }

  useEffect(() => {
    getData(); // Initial data fetch

    // Set up interval to refresh data every 30 seconds (adjust as needed)
    const interval = setInterval(() => {
      setRefreshing(true); // Set refreshing to true before fetching data
      getData();
    }, 30000); // 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const back = () => {
    navigation.goBack();
  };

  const transactions = userData?.transactions || [];

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
      <View style={{ padding: width * 0.05, paddingTop: height * -0.04 }}>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={index}>
              <TransactionCard data={transaction} />
            </View>
          ))
        ) : (
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: Colors.slateGray,
              alignSelf: "center",
              marginTop: height * 0.02,
            }}
          >
            No transactions available
          </Text>
        )}
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
