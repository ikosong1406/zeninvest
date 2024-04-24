import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import Logo from "../images/optiTrade.jpeg";
import { useFonts } from "@expo-google-fonts/dev";
import Colors from "../components/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Logo}
        style={{
          width: width * 0.1,
          height: height * 0.05,
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          fontFamily: "anta",
          fontSize: 50,
          color: Colors.slateGray,
          alignSelf: "center",
          marginLeft: width * 0.02,
        }}
      >
        ZenInvest
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    display: "flex",
    flexDirection: "row",
  },
});

export default Splash;
