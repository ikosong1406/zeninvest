import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, amount } = route.params;
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

  const next = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: "anta",
          fontSize: 20,
          color: Colors.slateGray,
          justifyContent: "center",
          alignSelf: "center",
          paddingTop: height * 0.04,
        }}
      >
        Success
      </Text>

      <AntDesign
        name="checkcircleo"
        size={width * 0.5}
        color={Colors.slateGray}
        style={{ alignSelf: "center", marginTop: height * 0.05 }}
      />
      <Text
        style={{
          fontFamily: "anta",
          fontSize: 20,
          color: Colors.slateGray,
          justifyContent: "center",
          alignSelf: "center",
          paddingTop: height * 0.04,
        }}
      >
        Investment Success
      </Text>

      <View
        style={{
          backgroundColor: "#cdcccc",
          padding: width * 0.04,
          marginTop: height * 0.03,
          margin: width * 0.04,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.slateGray,
          }}
        >
          Summary
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Amount: {amount}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Minimum interest: 6.2 %
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Stock Name: {data.companyName}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Name: {userData.fullname}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
          }}
        >
          Subscription: Annual
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.slateGray,
          marginTop: height * 0.05,
          borderRadius: 10,
          padding: width * 0.03,
          margin: width * 0.08,
        }}
        onPress={next}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.white,
            alignSelf: "center",
          }}
        >
          Back To Home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: width * 0.05,
  },
});

export default Success;
