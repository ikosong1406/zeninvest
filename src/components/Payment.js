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
import QRCode from "react-native-qrcode-svg";
import { useFonts } from "@expo-google-fonts/dev";
import Colors from "./Colors";

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
  // Add more coins as needed
];

const Payment = () => {
  const navigation = useNavigation();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

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
      converted = amount / 68000;
    } else if (coinValue === "ETH") {
      converted = amount / 3555;
    }
    setConvertedAmount(converted);
  };

  const next = () => {
    alert("Payment will be Confirmed");
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  };

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount...."
        placeholderTextColor={"gray"}
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
      />
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
          <Text
            style={{
              fontSize: width * 0.04,
              textAlign: "left",
              fontFamily: "anta",
              marginBottom: height * 0.02,
            }}
          >
            Transfer {convertedAmount} {selectedCoin.value} to
          </Text>
          <QRCode value={selectedCoin.address} size={150} />
          <Text style={styles.label}>Wallet Address:</Text>
          <Text style={styles.address}>{selectedCoin.address}</Text>
        </View>
      )}
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
  },
});

export default Payment;
