import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const cryptoCoins = [
  {
    label: "Bitcoin (BTC)",
    value: "BTC",
  },
  {
    label: "Ethereum (ETH)",
    value: "ETH",
  },
  // Add more coins as needed
];

const Withdraw = () => {
  const navigation = useNavigation();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");
  const [walletaddress, setWalletAddress] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
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

  const handleAmountChange = (text) => {
    setAmount(text);
    if (selectedCoin) {
      convertAmount(text, selectedCoin.value);
    }
  };

  const handleWalletChange = (text) => {
    setWalletAddress(text);
  };

  const convertAmount = (amount, coinValue) => {
    if (!coinValue) {
      return;
    }
    // Conversion logic goes here
    // For demonstration purposes, let's assume 1 BTC = 1000 USD and 1 ETH = 500 USD
    let converted;
    if (coinValue === "BTC") {
      converted = amount / 68000;
    } else if (coinValue === "ETH") {
      converted = amount / 3555;
    }
    setConvertedAmount(converted);
  };

  const confirmWithdrawal = () => {
    // Check if the withdrawal amount is valid
    const withdrawalAmount = parseFloat(amount);
    const userBalance = parseFloat(userData.balance); // Replace this with the actual user's balance

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    if (withdrawalAmount > userBalance) {
      alert("Insufficient balance. ");
      return;
    }

    // Proceed with withdrawal logic here
    alert("Withdrawal confirmed!");
    setModalVisible(false);
    // You can navigate to another screen after withdrawal confirmation
  };

  const back = () => {
    navigation.goBack("Transact");
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
            fontSize: 18,
            color: Colors.slateGray,
            marginLeft: "35%",
            alignSelf: "center",
          }}
        >
          Withdraw
        </Text>
      </View>

      <Text
        style={{
          fontFamily: "anta",
          fontSize: 18,
          color: Colors.slateGray,
          marginTop: height * 0.01,
          alignSelf: "center",
        }}
      >
        Choose Your Withdrawal Method
      </Text>

      <View style={styles.content}>
        <SelectDropdown
          data={cryptoCoins.map((coin) => coin.label)}
          defaultButtonText="Select a coin"
          onSelect={(selectedItem, index) =>
            setSelectedCoin(cryptoCoins[index])
          }
          buttonTextAfterSelection={(selectedItem, index) =>
            cryptoCoins[index].label
          }
          rowTextForSelection={(item, index) => cryptoCoins[index].label}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdownContainer}
          dropdownTextStyle={styles.dropdownText}
          dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        />
        {selectedCoin && (
          <View style={styles.infoContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount in Dollars...."
              placeholderTextColor={"gray"}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
            <Text
              style={{
                fontSize: width * 0.04,
                textAlign: "left",
                fontFamily: "anta",
                marginBottom: height * 0.02,
                marginTop: height * 0.02,
              }}
            >
              You will Recieve {convertedAmount} {selectedCoin.value}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Wallet Address...."
              placeholderTextColor={"gray"}
              value={walletaddress}
              onChangeText={handleWalletChange}
            />
          </View>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: Colors.slateGray,
            marginTop: height * 0.02,
            borderRadius: 10,
            padding: width * 0.04,
          }}
          onPress={() => setModalVisible(true)}
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalText}>Withdrawal Details:</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome
                  name="close"
                  size={width * 0.06}
                  color={Colors.slateGray}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>
              Amount: {convertedAmount} {selectedCoin?.value}
            </Text>
            <Text style={styles.modalText}>
              Wallet Address: {walletaddress}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={confirmWithdrawal}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
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
  },
  content: {
    width: "100%",
    padding: width * 0.05,
  },
  dropdownButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.slateGray,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: height * 0.02,
  },
  dropdownButtonText: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "anta",
  },
  dropdownContainer: {
    width: "82%",
    borderWidth: 1,
    borderColor: Colors.slateGray,
    borderRadius: 8,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "anta",
  },
  dropdownTextHighlight: {
    fontWeight: "bold",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: height * 0.01,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#cdcccc",
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 10,
    padding: width * 0.02,
    color: "#333",
    width: "100%",
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
    marginTop: height * 0.02,
  },
  modalButton: {
    backgroundColor: Colors.slateGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: height * 0.01,
  },
  modalButtonText: {
    color: Colors.white,
    fontFamily: "anta",
    fontSize: 16,
  },
});

export default Withdraw;
