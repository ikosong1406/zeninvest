import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import Colors from "../components/Colors";
import Sidenav from "./Sidenav";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Header = ({ setSelectedScreen, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState("");
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: width * 0.05,
        marginTop: height * 0.02,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={toggleModal}>
        <AntDesign
          name="menu-unfold"
          size={width * 0.06}
          color={Colors.slateGray}
          style={{
            alignSelf: "center",
            marginTop: height * 0.007,
          }}
        />
      </TouchableOpacity>

      <View style={styles.profileInitial}>
        <Text style={styles.profileInitialText}>
          {userData.fullname ? userData.fullname[0].toUpperCase() : ""}
        </Text>
      </View>

      {modalVisible && (
        <Sidenav
          setSelectedScreen={setSelectedScreen}
          visible={modalVisible}
          onClose={toggleModal}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileInitial: {
    width: width * 0.11,
    height: height * 0.05,
    borderRadius: 100,
    alignSelf: "center",
    borderColor: Colors.gold,
    backgroundColor: "#cdcccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitialText: {
    fontSize: width * 0.07,
    color: Colors.slateGray,
    fontFamily: "anta",
  },
});
export default Header;
