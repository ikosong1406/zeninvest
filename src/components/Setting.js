import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackendApi from "../api/BackendApi";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Setting = () => {
  const navigation = useNavigation();
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
          Settings
        </Text>
      </View>
      <View style={{ paddingHorizontal: width * 0.05 }}>
        <TouchableOpacity style={styles.box2}>
          <FontAwesome6
            name="location-dot"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box2}>
          <FontAwesome5
            name="lock"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Transaction Pin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box2}>
          <FontAwesome6
            name="question-circle"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Help Center
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box2}>
          <FontAwesome6
            name="bell"
            size={width * 0.06}
            color={Colors.slateGray}
          />
          <Text
            style={{
              fontSize: width * 0.05,
              width: "40%",
              marginLeft: width * 0.04,
              fontFamily: "anta",
            }}
          >
            Notification
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
  box2: {
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
});

export default Setting;
