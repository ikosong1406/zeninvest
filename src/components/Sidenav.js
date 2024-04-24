import React from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "./Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Sidenav = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const Transaction = () => {
    onClose();
    navigation.navigate("Transaction");
  };

  const Portfolio = () => {
    onClose();
    navigation.navigate("Portfolio");
  };

  const Setting = () => {
    onClose();
    navigation.navigate("Setting");
  };

  const Account = () => {
    onClose();
    navigation.navigate("Account");
  };

  const logout = () => {
    setActive("Profile");
    // onClose();
    // navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 30,
                  fontFamily: "anta",
                }}
              >
                ZenInvest
              </Text>
            </View>

            <View
              style={{
                backgroundColor: Colors.white,
                width: "100%",
                height: 1,
                marginTop: height * 0.03,
              }}
            />

            <View>
              <TouchableOpacity style={styles.inactive} onPress={Transaction}>
                <Entypo
                  name="clipboard"
                  size={width * 0.05}
                  color={Colors.white}
                />
                <Text style={styles.activeText}> Transaction </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactive} onPress={Portfolio}>
                <AntDesign
                  name="piechart"
                  size={width * 0.05}
                  color={Colors.white}
                />
                <Text style={styles.activeText}>Portfolio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactive} onPress={Setting}>
                <Ionicons
                  name="settings"
                  size={width * 0.05}
                  color={Colors.white}
                />
                <Text style={styles.activeText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Account}
                style={{
                  borderRadius: 10,
                  paddingHorizontal: width * 0.04,
                  padding: width * 0.02,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: height * 0.3,
                }}
              >
                <FontAwesome
                  name="user"
                  size={width * 0.06}
                  color={Colors.gold}
                />
                <Text style={styles.inactiveText}>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                style={{
                  borderRadius: 10,
                  paddingHorizontal: width * 0.04,
                  padding: width * 0.02,
                  display: "flex",
                  flexDirection: "row",
                  marginTop: height * 0.02,
                }}
              >
                <Ionicons
                  name="log-out"
                  size={width * 0.06}
                  color={Colors.gold}
                />
                <Text style={styles.inactiveText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome6
              name="xmark"
              size={width * 0.1}
              color={Colors.gold}
              style={{ marginLeft: width * 0.05, marginTop: height * 0.05 }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.slateGray,
    padding: 20,
    paddingTop: 60,
    borderRadius: 10,
    width: "60%",
    height: "100%",
  },
  inactive: {
    marginTop: height * 0.03,
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    padding: width * 0.02,
    display: "flex",
    flexDirection: "row",
  },
  activeText: {
    color: Colors.white,
    alignSelf: "center",
    marginLeft: width * 0.02,
    fontSize: 16,
    fontFamily: "anta",
  },
  inactiveText: {
    color: Colors.gold,
    alignSelf: "center",
    marginLeft: width * 0.02,
    fontSize: 16,
    fontFamily: "anta",
  },
});

export default Sidenav;
