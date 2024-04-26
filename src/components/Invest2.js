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
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Invest2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, index, amount } = route.params;
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
    navigation.navigate("Success", { data, index, amount });
  };

  const back = () => {
    navigation.goBack();
  };

  const handleInvest = async () => {
    const investData = {
      userId: userData._id,
      companyName: data.companyName,
      amount: amount,
      interest: 6.2,
      subscription: "Annual",
      companyImage: data.image,
    };
    axios
      .post(`${BackendApi}/invest`, investData)
      .then((res) => {
        if (res.data.status === "ok") {
          navigation.navigate("Success", { data, index, amount });
        } else {
          console.error("Error investing:", error);
          alert("Error", "Failed to invest. Please try again.");
        }
      })
      .catch((e) => console.log(e));
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
            marginLeft: "30%",
            alignSelf: "center",
          }}
        >
          Enter Amount
        </Text>
      </View>

      <View
        style={{ paddingTop: width * 0.05, paddingHorizontal: width * 0.04 }}
      >
        <View
          style={{
            backgroundColor: "#cdcccc",
            padding: width * 0.04,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: data.image }}
            style={{
              width: width * 0.25,
              height: height * 0.12,
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.02,
            alignSelf: "center",
          }}
        >
          {data.companyName}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            marginTop: height * 0.02,
          }}
        >
          {data.price}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: "green",
            marginTop: height * 0.005,
          }}
        >
          {data.changes}
        </Text>
      </View>
      <View style={{ paddingHorizontal: width * 0.04 }}>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            marginTop: height * 0.02,
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

        <TouchableOpacity
          style={{
            backgroundColor: Colors.slateGray,
            marginTop: height * 0.02,
            borderRadius: 10,
            padding: width * 0.03,
            marginTop: height * 0.04,
          }}
          onPress={handleInvest}
        >
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
              alignSelf: "center",
            }}
          >
            Invest
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: width * 0.05,
  },
  box: {
    padding: width * 0.04,
    backgroundColor: "white",
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
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
    marginTop: height * 0.02,
  },
});

export default Invest2;
