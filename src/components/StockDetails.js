import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StockDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, index } = route.params;
  const [fontsLoaded] = useFonts({
    anta: require("../fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const next = () => {
    navigation.navigate("Invest1", { data, index });
  };

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
          {data.symbol}
        </Text>
      </View>

      <ScrollView>
        <View style={{ padding: width * 0.05 }}>
          <View
            style={{
              backgroundColor: "#cdcccc",
              padding: width * 0.04,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: data.image }}
              style={{
                width: width * 0.25,
                height: height * 0.12,
                borderRadius: 10,
                alignSelf: "center",
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: Colors.slateGray,
              marginTop: height * 0.02,
              alignSelf: "center",
            }}
          >
            {data.companyName}
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: Colors.slateGray,
              marginTop: height * 0.02,
            }}
          >
            {data.price}
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 18,
              color: "green",
              marginTop: height * 0.005,
            }}
          >
            {data.changes}
          </Text>

          <View style={{ marginTop: height * 0.0 }}>
            <View style={styles.box}>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 18,
                  color: Colors.slateGray,
                  marginTop: height * 0.005,
                }}
              >
                Market Cap
              </Text>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 18,
                  color: Colors.slateGray,
                  marginTop: height * 0.005,
                }}
              >
                {data.mktCap}
              </Text>
            </View>
            <View style={styles.box}>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 18,
                  color: Colors.slateGray,
                  marginTop: height * 0.005,
                }}
              >
                Previous Close
              </Text>
              <Text
                style={{
                  fontFamily: "anta",
                  fontSize: 18,
                  color: Colors.slateGray,
                  marginTop: height * 0.005,
                }}
              >
                {data.lastDiv}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.slateGray,
              marginTop: height * 0.04,
              borderRadius: 10,
              padding: width * 0.03,
            }}
            onPress={next}
          >
            <Text
              style={{
                fontFamily: "anta",
                fontSize: 18,
                color: Colors.white,
                alignSelf: "center",
              }}
            >
              Invest
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "anta",
              fontSize: 20,
              color: Colors.slateGray,
              marginTop: height * 0.02,
            }}
          >
            About {data.companyName}
          </Text>
          <Text
            style={{
              fontFamily: "anta",
              fontSize: 14,
              color: Colors.slateGray,
              marginTop: height * 0.01,
            }}
          >
            {data.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  box: {
    padding: width * 0.04,
    backgroundColor: "white",
    marginTop: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
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

export default StockDetails;
