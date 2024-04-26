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
  Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../images/image.jpg";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const Account = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(date);
    alert("A date has been picked: ", date);
    hideDatePicker();
  };

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios.post(`${BackendApi}/userdata`, { token: token }).then((res) => {
      setUserData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
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
          Edit Profile
        </Text>
      </View>

      <View style={{ display: "flex", alignItems: "center" }}>
        <Image
          source={User}
          style={{
            width: width * 0.25,
            height: height * 0.12,
            borderRadius: 100,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            marginTop: height * 0.03,
            fontSize: width * 0.06,
            width: "100%",
            textAlign: "center",
            color: "gray",
            fontFamily: "anta",
          }}
        >
          {userData.fullname}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          height: height * 0.001,
          backgroundColor: "gray",
          alignSelf: "center",
          marginTop: height * 0.03,
        }}
      />

      <View style={{ paddingHorizontal: width * 0.03 }}>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.03,
            marginHorizontal: width * 0.04,
          }}
        >
          Fullname
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData.fullname}
            placeholderTextColor="#888"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.03,
            marginHorizontal: width * 0.04,
          }}
        >
          Gender
        </Text>
        <SelectDropdown
          data={genderOptions.map((genders) => genders.label)}
          defaultButtonText="Select..."
          onSelect={(selectedItem, index) => setGender(genderOptions[index])}
          buttonTextAfterSelection={(selectedItem, index) =>
            genderOptions[index].label
          }
          rowTextForSelection={(item, index) => genderOptions[index].label}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdownContainer}
          dropdownTextStyle={styles.dropdownText}
          dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        />
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.03,
            marginHorizontal: width * 0.04,
          }}
        >
          Date of Birth
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text
              style={{
                fontSize: 18,
                color: "gray",
                marginVertical: height * 0.005,
              }}
            >
              Pick date
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 18,
            color: Colors.slateGray,
            marginTop: height * 0.03,
            marginHorizontal: width * 0.04,
          }}
        >
          Email
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData.email}
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.slateGray,
          marginTop: height * 0.1,
          borderRadius: 10,
          padding: width * 0.04,
          width: "90%",
          alignSelf: "center",
        }}
        // onPress={next}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.white,
            alignSelf: "center",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
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
  dropdownButton: {
    width: "90%",
    backgroundColor: "#cdcccc",
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    color: "#333",
    marginTop: height * 0.01,
    marginLeft: width * 0.04,
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
});

export default Account;
