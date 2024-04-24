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
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 14,
              color: "green",
              marginTop: height * 0.01,
            }}
          >
            24.33%
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 14,
              color: "gray",
              marginTop: height * 0.01,
              marginLeft: width * 0.02,
            }}
          >
            Today
          </Text>
        </View>

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
          <View style={styles.box2}>
            <Image
              source={image}
              style={{
                width: width * 0.4,
                height: height * 0.05,
                borderRadius: 10,
              }}
            />
            <View style={{ marginLeft: width * 0.1 }}>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 18,
                  color: Colors.slateGray,
                }}
              >
                $10,000.00
              </Text>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 15,
                  color: "red",
                  marginTop: height * 0.01,
                }}
              >
                -0.1(50.8)
              </Text>
            </View>
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
  box2: {
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
