import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "./Colors";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import axios from "axios";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [active, setActive] = useState(false);

  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setActive(!active);
  };

  const register = () => {
    if (!fullname || !email || !password || !isChecked) {
      alert("Please fill out all fields and agree to the terms");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    const userData = {
      fullname: fullname,
      email: email,
      password: password,
    };
    axios
      .post(`${BackendApi}/register`, userData)
      .then((res) => {
        if (res.data.status === "ok") {
          // Account created successfully
          alert("Account created");
          setFullname("");
          setEmail("");
          setPassword("");
        } else {
          // Account already exists
          alert("Account already exists");
          setFullname("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor={"gray"}
        value={fullname}
        onChangeText={(text) => setFullname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={"gray"}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          {showPassword ? (
            <Entypo name="eye" size={24} color={Colors.gold} />
          ) : (
            <Entypo name="eye-with-line" size={24} color={Colors.gold} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: height * 0.02,
          marginTop: height * 0.25,
        }}
      >
        <TouchableOpacity onPress={handleCheckboxChange}>
          <View style={styles.checkbox}>
            {isChecked && (
              <Ionicons
                name="checkmark-done-sharp"
                size={24}
                color={Colors.gold}
              />
            )}
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.label}>I agree with </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.gold,
                  fontSize: 16,
                  marginLeft: width * 0.04,
                  fontFamily: "anta",
                }}
              >
                Terms and condition
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>and </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.gold,
                  fontSize: 16,
                  fontFamily: "anta",
                }}
              >
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={active === true && isChecked ? styles.active : styles.inactive}
        onPress={() => register()}
        disabled={!isChecked}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 20,
            color: Colors.white,
            alignSelf: "center",
          }}
        >
          REGISTRATION
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: height * 0.05,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: Colors.white,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    height: height * 0.05,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
    marginBottom: 20,
  },
  passwordInput: {
    height: 40,
    width: "80%",
    paddingHorizontal: 10,
    flex: 1,
    color: Colors.white,
  },
  checkbox: {
    width: width * 0.07,
    height: height * 0.03,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "gray",
    marginLeft: width * 0.03,
    fontSize: 16,
    paddingRight: width * 0.02,
    fontFamily: "anta",
  },
  active: {
    backgroundColor: Colors.gold,
    height: height * 0.05,
    borderRadius: 10,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  inactive: {
    backgroundColor: "gray",
    height: height * 0.05,
    borderRadius: 10,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Register;
