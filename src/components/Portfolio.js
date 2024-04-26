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
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import image from "../images/Stock.jpg";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Portfolio = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post(`${BackendApi}/userdata`, { token: token }).then((res) => {
      setUserData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
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

        <View>
          <View style={{ padding: width * 0.0, paddingTop: height * -0.04 }}>
            {portfolio.length > 0 ? (
              portfolio.map((portfolio, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.box}>
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
          </View>
        </View>
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
    // width: "100%",
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
