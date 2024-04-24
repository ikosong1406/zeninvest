import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import image from "../images/Stock.jpg";
import { FontAwesome6 } from "@expo/vector-icons";
import TopStock from "../components/TopStock";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stockData from "../json/stockData.json";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Invest = () => {
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

  const StockList = () => {
    navigation.navigate("StockList");
  };
  const Portfolio = () => {
    navigation.navigate("Portfolio");
  };

  const firstRowData = stockData.slice(0, 2);
  const secondRowData = stockData.slice(2, 4);

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
            fontSize: 20,
            color: Colors.slateGray,
            marginLeft: "35%",
            alignSelf: "center",
          }}
        >
          Invest
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: width * 0.04,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.box}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome6
              name="wallet"
              size={width * 0.05}
              color={Colors.white}
            />
            <Text
              style={{
                fontFamily: "anta",
                fontSize: 16,
                color: Colors.white,
                marginLeft: "10%",
                alignSelf: "center",
              }}
            >
              Balance
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
              marginTop: height * 0.01,
            }}
          >
            $ {userData.balance}
          </Text>
        </View>
        <View style={styles.box}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome5
              name="shopping-bag"
              size={width * 0.05}
              color={Colors.white}
            />
            <Text
              style={{
                fontFamily: "anta",
                fontSize: 16,
                color: Colors.white,
                marginLeft: "10%",
                alignSelf: "center",
              }}
            >
              Assets
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
              marginTop: height * 0.01,
            }}
          >
            $ {userData.totalInvested}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: height * 0.03,
          padding: width * 0.04,
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Top Stock to invest in
        </Text>
        <TouchableOpacity onPress={StockList}>
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

      <View style={{ paddingHorizontal: width * 0.04 }}>
        <View style={styles.row}>
          {firstRowData.map((item, index) => (
            <TopStock key={index} data={item} />
          ))}
        </View>
        <View style={styles.row}>
          {secondRowData.map((item, index) => (
            <TopStock key={index} data={item} />
          ))}
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: height * 0.04,
          padding: width * 0.04,
          backgroundColor: Colors.slateGray,
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.white,
          }}
        >
          Stock Portfolio
        </Text>
        <TouchableOpacity onPress={Portfolio}>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

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
              fontSize: 20,
              color: Colors.slateGray,
            }}
          >
            $10,000.00
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 20,
              color: "red",
              marginTop: height * 0.01,
            }}
          >
            -0.1(50.8)
          </Text>
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
    width: "47%",
    padding: width * 0.05,
    backgroundColor: Colors.slateGray,
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box2: {
    width: "45%",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.03,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#cdcccc",
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 10,
    padding: width * 0.02,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default Invest;
