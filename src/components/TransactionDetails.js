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
import { useRoute } from "@react-navigation/native";
import { useFonts } from "@expo-google-fonts/dev";
import Colors from "../components/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TransactionDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, index } = route.params;
  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
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
            marginLeft: "25%",
            alignSelf: "center",
          }}
        >
          Transactions Details
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#cdcccc",
          padding: width * 0.02,
          marginTop: height * 0.01,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: width * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          Date: {data.date}
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          {data.time}
        </Text>
      </View>
      <View
        style={{
          padding: width * 0.02,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          Id
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          {data._id}
        </Text>
      </View>
      <View
        style={{
          padding: width * 0.02,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          Amount
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          {data.amount}
        </Text>
      </View>
      <View
        style={{
          padding: width * 0.02,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          Type
        </Text>
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.slateGray,
            alignSelf: "center",
          }}
        >
          {data.type}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.slateGray,
          marginTop: height * 0.05,
          margin: width * 0.02,
          borderRadius: 10,
          padding: width * 0.03,
        }}
        onPress={back}
      >
        <Text
          style={{
            fontFamily: "anta",
            fontSize: 16,
            color: Colors.white,
            alignSelf: "center",
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: width * 0.04,
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
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TransactionDetails;
