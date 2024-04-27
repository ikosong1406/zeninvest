import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import Colors from "./Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const cryptoCoins = [
  {
    label: "Bitcoin (BTC)",
    value: "BTC",
    address: "bc1q52fla3rqj6an8fatd7m3xma5uzymv9ph7m8xsc",
  },
  {
    label: "Ethereum (ETH)",
    value: "ETH",
    address: "0xE447f3Dc0dc5BA8B3e874eB2259bdDff8a7667bA",
  },
  {
    label: "Litecoin (LTC)",
    value: "LTC",
    address: "ltc1q6zcsf7rqh0gq7wd5uwjxyx68rn7kyc2lr9t6wq",
  },
  {
    label: "Bitcoin Cash (BCH)",
    value: "BCH",
    address: "qzcx8r5nrhaweytvqz6fg9m8au7k9j48hywa7ampvn",
  },
  {
    label: "BNB smart Chain(BNB)",
    value: "BNB",
    address: "0xE447f3Dc0dc5BA8B3e874eB2259bdDff8a7667bA",
  },
];

const Payment = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
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

  const handleAmountChange = (text) => {
    setAmount(text);
    if (selectedCoin) {
      convertAmount(text, selectedCoin.value);
    }
  };

  const convertAmount = (amount, coinValue) => {
    if (!coinValue) {
      return;
    }
    // Conversion logic goes here
    // For demonstration purposes, let's assume 1 BTC = 1000 USD and 1 ETH = 500 USD
    let converted;
    if (coinValue === "BTC") {
      converted = amount / 62800;
    } else if (coinValue === "ETH") {
      converted = amount / 3152;
    } else if (coinValue === "LTC") {
      converted = amount / 84;
    } else if (coinValue === "BCH") {
      converted = amount / 473;
    } else if (coinValue === "BNB") {
      converted = amount / 589;
    }
    setConvertedAmount(converted);
  };

  const handleDeposit = async () => {
    const investData = {
      userId: userData._id,
      amount: amount,
      type: "Deposit",
      coin: selectedCoin.label,
    };
    axios
      .post(`${BackendApi}/transaction`, investData)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Payment will be Confirmed");
          setTimeout(() => {
            navigation.navigate("Home");
          }, 3000);
        } else {
          alert("Error", "Failed to deposit. Please try again.");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleCopyAddress = (address) => {
    Clipboard.setString(address);
    alert("Address copied to clipboard");
  };

  return (
    <View style={styles.content}>
      <SelectDropdown
        data={cryptoCoins.map((coin) => coin.label)}
        defaultButtonText="Select a coin"
        onSelect={(selectedItem, index) => setSelectedCoin(cryptoCoins[index])}
        buttonTextAfterSelection={(selectedItem, index) =>
          cryptoCoins[index].label
        }
        rowTextForSelection={(item, index) => cryptoCoins[index].label}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdownContainer}
        dropdownTextStyle={styles.dropdownText} // Optional: for customizing dropdown text style
        dropdownTextHighlightStyle={styles.dropdownTextHighlight} // Optional: for customizing highlighted text style
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
            Transfer {convertedAmount} {selectedCoin.value} to
          </Text>
          <QRCode value={selectedCoin.address} size={150} />
          <Text style={styles.label}>Wallet Address:</Text>
          <Text style={styles.address}>{selectedCoin.address}</Text>
          <TouchableOpacity
            onPress={() => handleCopyAddress(selectedCoin.address)}
            style={styles.copyButton}
          >
            <Text style={styles.copyButtonText}>Copy Address</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              textAlign: "center",
              marginTop: height * 0.04,
            }}
          >
            Copy the wallet address and make the payment
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.slateGray,
          marginTop: height * 0.03,
          borderRadius: 10,
          padding: width * 0.04,
        }}
        onPress={handleDeposit}
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
  );
};

const styles = StyleSheet.create({
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
  label: {
    fontSize: 18,
    marginTop: width * 0.06,
    fontFamily: "anta",
  },
  address: {
    fontSize: 18,
    marginTop: width * 0.02,
    fontFamily: "anta",
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
  copyButton: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
    marginTop: height * 0.02,
    padding: width * 0.03,
  },
  copyButtonText: {
    color: Colors.white,
    fontFamily: "anta",
  },
});

export default Payment;
