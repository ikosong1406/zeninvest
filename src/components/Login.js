import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "./Colors";
import { useFonts } from "@expo-google-fonts/dev";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [active, setActive] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Login = () => {
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const userData = {
      email,
      password,
    };

    axios
      .post(`${BackendApi}/login`, userData)
      .then((res) => {
        if (res.data.status === "ok") {
          setEmail("");
          setPassword("");
          AsyncStorage.setItem("token", res.data.data);
          navigation.navigate("Tab");
        } else {
          alert("invalid details");
          setEmail("");
          setPassword("");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    updateActive(text, password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    updateActive(email, text);
  };

  const updateActive = (email, password) => {
    if (email !== "" && password !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const at = () => {
    setActive(!active);
  };

  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={handleEmailChange}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={"gray"}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
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
          marginTop: height * 0.3,
        }}
      >
        <TouchableOpacity
          onPress={Login}
          style={active ? styles.active : styles.inactive}
          disabled={!active} // Disable button when not active
        >
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 20,
              color: Colors.white,
              alignSelf: "center",
            }}
          >
            LOG IN
          </Text>
        </TouchableOpacity>
      </View>
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

export default Login;
