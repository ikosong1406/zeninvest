import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Setting = () => {
  const navigation = useNavigation();
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
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

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        saveLocationToDatabase(location.coords); // Save location to database
      } else {
        setLocationPermission(false);
        Alert.alert("Location permission required");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  // Function to save location to backend API
  const saveLocationToDatabase = async (coords) => {
    const locData = {
      userId: userData._id,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    axios
      .post(`${BackendApi}/locationDb`, locData)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Location Saved");
        } else {
          console.error("Error getting location:", error);
          alert("Error", "Failed to get location. Please try again.");
        }
      })
      .catch((e) => console.log(e));
  };

  const openTelegramDM = () => {
    const telegramURL = "https://t.me/Derealalexis";
    Linking.canOpenURL(telegramURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(telegramURL);
        } else {
          Alert.alert("Error", "Telegram is not installed on your device.");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  useEffect(() => {
    // Check and request location permission when component mounts
    requestLocationPermission();
  }, []);

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
            fontSize: 20,
            color: Colors.slateGray,
            marginLeft: "35%",
            alignSelf: "center",
          }}
        >
          Settings
        </Text>
      </View>
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <TouchableOpacity
          style={styles.box2}
          onPress={requestLocationPermission}
        >
          <FontAwesome6
            name="location-dot"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box2} onPress={openTelegramDM}>
          <FontAwesome6
            name="question-circle"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Help Center
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

export default Setting;
