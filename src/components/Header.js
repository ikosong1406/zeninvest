import React, { useState } from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Colors from "../components/Colors";
import User from "../images/image.jpg";
import Sidenav from "./Sidenav";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Header = ({ setSelectedScreen, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: width * 0.05,
        marginTop: height * 0.02,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={toggleModal}>
        <AntDesign
          name="menu-unfold"
          size={width * 0.06}
          color={Colors.slateGray}
          style={{
            alignSelf: "center",
            marginTop: height * 0.007,
          }}
        />
      </TouchableOpacity>

      <Image
        source={User}
        style={{
          width: width * 0.1,
          height: height * 0.05,
          borderRadius: 100,
          alignSelf: "center",
        }}
      />
      {modalVisible && (
        <Sidenav
          setSelectedScreen={setSelectedScreen}
          visible={modalVisible}
          onClose={toggleModal}
        />
      )}
    </SafeAreaView>
  );
};

export default Header;
