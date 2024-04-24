import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/Colors";
import Logo from "../images/optiTrade.jpeg";
import { useFonts } from "@expo-google-fonts/dev";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Register from "../components/Register";
import Login from "../components/Login";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Authentication = () => {
  const [active, setActive] = useState("register");

  const handleButtonPress = (Tag) => {
    setActive(Tag);
  };

  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          source={Logo}
          style={{
            width: width * 0.07,
            height: height * 0.035,
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 20,
            color: Colors.white,
            alignSelf: "center",
            marginLeft: width * 0.02,
          }}
        >
          ZenInvest
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: height * 0.04,
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <TouchableOpacity
          onPress={() => handleButtonPress("register")}
          style={active === "register" ? styles.active : styles.inactive}
        >
          <Text style={active === "register" ? styles.active : styles.inactive}>
            REGISTRATION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress("login")}
          style={active === "login" ? styles.active : styles.inactive}
        >
          <Text style={active === "login" ? styles.active : styles.inactive}>
            LOG IN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "90%", marginTop: height * 0.04 }}>
        {active === "register" && <Register />}
        {active === "login" && <Login />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: Colors.slateGray,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    color: Colors.gold,
    fontFamily: "anta",
    fontSize: 20,
    alignSelf: "center",
    borderBottomColor: Colors.gold,
    borderBottomWidth: 1,
  },
  inactive: {
    fontFamily: "anta",
    fontSize: 20,
    color: Colors.white,
    alignSelf: "center",
  },
});

export default Authentication;
