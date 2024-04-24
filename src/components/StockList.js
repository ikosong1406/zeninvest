import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import StockList1 from "./StockList1";
import stockData from "../json/stockData.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StockList = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
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
            marginLeft: "20%",
            alignSelf: "center",
          }}
        >
          Top Stock to invest in
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView style={{ paddingBottom: height * 0.06 }}>
        {stockData.map((item, index) => (
          <View style={{ paddingHorizontal: width * 0.05 }}>
            <StockList1 key={index} data={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: height * 0.02,
  },
  box: {
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
    marginTop: height * 0.01,
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
    paddingHorizontal: 10, // Add padding to space items evenly
    marginTop: 10, // Add margin between rows
  },
});

export default StockList;
