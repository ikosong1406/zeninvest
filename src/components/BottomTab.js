import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeScreen from "../screens/Home";
import Invest from "../screens/Invest";
import Transact from "../screens/Transact";
import Colors from "./Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.slateGray,
        tabBarInactiveTintColor: "#8790a3",
        tabBarStyle: {
          backgroundColor: Colors.white,
          display: "flex",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={width * 0.07} color={color} />
          ),
          headerShown: false,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Invest"
        component={Invest}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="arrow-trend-up"
              size={width * 0.07}
              color={color}
            />
          ),
          headerShown: false,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Transact"
        component={Transact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="clipboard" size={width * 0.07} color={color} />
          ),
          headerShown: false,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
