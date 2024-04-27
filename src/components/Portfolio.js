import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Portfolio = () => {
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

  const back = () => {
    navigation.goBack();
  };

  const handleSale = (stockId) => {
    // Implement your logic here to sell the stock with the specified stockId
    // console.log("Selling stock with ID:", stockId);
    // Example: You can navigate to a sale screen or perform an API call to sell the stock
  };

  const portfolio = userData?.portfolio || [];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
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
            marginLeft: "35%",
            alignSelf: "center",
          }}
        >
          Portfolio
        </Text>
      </View>

      <View
        style={{ paddingHorizontal: width * 0.04, marginTop: height * 0.04 }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: "gray",
          }}
        >
          Balance
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 25,
            color: Colors.slateGray,
            marginTop: height * 0.01,
          }}
        >
          $ {userData.totalInvested}
        </Text>

        <Text
          style={{
            fontFamily: "anta",
            fontSize: 20,
            color: Colors.slateGray,
            marginTop: height * 0.04,
          }}
        >
          Assets
        </Text>

        <ScrollView style={{ paddingBottom: height * 0.05, height: "80%" }}>
          {portfolio.length > 0 ? (
            portfolio.map((portfolio, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: width * 0.005,
                  paddingVertical: height * 0.005,
                }}
              >
                <TouchableOpacity style={styles.box} onPress={handleSale}>
                  <Image
                    source={{ uri: portfolio.companyImage }}
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
                      {portfolio.companyName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "anta",
                        fontSize: 16,
                        color: Colors.slateGray,
                      }}
                    >
                      Amount Invested : ${portfolio.amount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "anta",
                        fontSize: 16,
                        color: Colors.slateGray,
                      }}
                    >
                      Interest : {portfolio.interest}/{portfolio.subscription}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "anta",
                        fontSize: 16,
                        color: "green",
                      }}
                    >
                      Profit Generated : ${portfolio.profit}
                    </Text>
                  </View>
                </TouchableOpacity>
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
              No Investments
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: width * 0.04,
  },
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

export default Portfolio;
