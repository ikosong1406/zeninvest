import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Transact = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const back = () => {
    navigation.goBack();
  };

  const Deposit = () => {
    navigation.navigate("Deposit");
  };

  const Withdraw = () => {
    navigation.navigate("Withdraw");
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
          Transact
        </Text>
      </View>

      <View
        style={{
          padding: width * 0.05,
          paddingTop: height * -0.04,
        }}
      >
        <TouchableOpacity style={styles.box} onPress={Deposit}>
          <Feather
            name="arrow-down-left"
            size={width * 0.1}
            color="white"
            style={{
              backgroundColor: "green",
              borderRadius: 100,
              height: height * 0.045,
            }}
          />
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 20,
              color: Colors.slateGray,
              marginLeft: "10%",
              alignSelf: "center",
            }}
          >
            Deposit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={Withdraw}>
          <Feather
            name="arrow-up-right"
            size={width * 0.1}
            color="white"
            style={{
              backgroundColor: "red",
              borderRadius: 100,
              height: height * 0.045,
            }}
          />
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 20,
              color: Colors.slateGray,
              marginLeft: "10%",
              alignSelf: "center",
            }}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  box: {
    padding: width * 0.05,
    backgroundColor: "white",
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    alignItems: "center",
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
});

export default Transact;
