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
  Modal,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Invest1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, index } = route.params;
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const next = () => {
    if (!amount.trim()) {
      alert("Please enter the amount.");
      return;
    }
    // Parse the purchase amount
    const purchaseAmount = parseFloat(amount);

    // Check if the user balance can cover the purchase
    const userBalance = parseFloat(userData.balance);
    // Sample user balance (replace with actual balance retrieval logic)
    if (userBalance >= purchaseAmount) {
      navigation.navigate("Invest2", { data, index, amount });
    } else {
      setModalVisible(true); // Show modal for insufficient balance
    }
  };

  const back = () => {
    navigation.goBack();
  };

  const Deposit = () => {
    navigation.navigate("Deposit");
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
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.04,
            marginHorizontal: width * 0.04,
          }}
        >
          Enter Amount
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount..."
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.slateGray,
            marginTop: height * 0.02,
            borderRadius: 10,
            padding: width * 0.04,
          }}
          onPress={next}
        >
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 16,
              color: Colors.white,
              alignSelf: "center",
            }}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.modalText}>Insufficient Balance!</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // Handle cancellation of purchase
                }}
              >
                <FontAwesome
                  name="close"
                  size={width * 0.06}
                  color={Colors.slateGray}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText1}>
              Your balance is not enough to make this purchase.
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: width * 0.02,
                backgroundColor: Colors.slateGray,
                width: "40%",
                marginTop: height * 0.02,
              }}
              onPress={Deposit}
            >
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 14,
                  color: Colors.white,
                  alignSelf: "center",
                }}
              >
                Fund Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    elevation: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "anta",
    marginBottom: 10,
  },
  modalText1: {
    fontSize: 16,
    fontFamily: "anta",
    marginBottom: 10,
    marginTop: height * 0.02,
  },
  modalSubText: {
    fontSize: 16,
    fontFamily: "anta",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: Colors.slateGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: Colors.red,
  },
  modalButtonText: {
    color: Colors.white,
    fontFamily: "anta",
    fontSize: 16,
  },
});

export default Invest1;
