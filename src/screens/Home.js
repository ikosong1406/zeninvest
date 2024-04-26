import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/Colors";
import Header from "../components/Header";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post(`${BackendApi}/userdata`, { token: token }).then((res) => {
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

  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Deposit = () => {
    navigation.navigate("Deposit");
  };

  const Transaction = () => {
    navigation.navigate("Transaction");
  };

  const transactions = userData?.transactions || [];
  const firstRowData = transactions.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 20,
            color: Colors.slateGray,
            marginLeft: width * 0.02,
            marginTop: height * 0.04,
          }}
        >
          Hi
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 25,
            color: Colors.slateGray,
            marginLeft: width * 0.02,
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
          }}
        >
          {userData.fullname}
        </Text>
        <View style={styles.box}>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: Colors.white,
              fontWeight: "900",
              marginTop: height * 0.01,
            }}
          >
            Primary Account
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
            }}
          >
            {userData.accountNumber}
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: Colors.white,
              fontWeight: "900",
              marginTop: height * 0.02,
            }}
          >
            Available Balance
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
            }}
          >
            $ {userData.balance}
          </Text>

          <TouchableOpacity
            style={{
              borderRadius: 10,
              padding: width * 0.02,
              backgroundColor: Colors.white,
              width: "40%",
              marginTop: height * 0.03,
            }}
            onPress={Deposit}
          >
            <Text
              style={{
                fontFamily: "anta",
                fontSize: 14,
                color: Colors.slateGray,
                alignSelf: "center",
              }}
            >
              Fund Account
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: height * 0.03,
          }}
        >
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.slateGray,
            }}
          >
            Recent Transaction
          </Text>
          <TouchableOpacity onPress={Transaction}>
            <Text
              style={{
                fontFamily: "anta",
                fontSize: 16,
                color: Colors.slateGray,
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {firstRowData.map((data, index) => (
            <View style={styles.box2}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Feather
                  name={
                    data.type === "Deposit"
                      ? "arrow-down-left"
                      : "arrow-up-right"
                  }
                  size={width * 0.1}
                  color="white"
                  style={{
                    backgroundColor: data.type === "Deposit" ? "green" : "red",
                    borderRadius: 100,
                  }}
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
            </View>
          ))}
        </View>
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
    height: 200,
    backgroundColor: Colors.slateGray,
    borderColor: Colors.gold,
    borderWidth: 2,
    borderRadius: 10,
    padding: width * 0.04,
    marginTop: height * 0.01,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box2: {
    padding: width * 0.05,
    backgroundColor: "white",
    marginTop: height * 0.025,
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

export default Home;
