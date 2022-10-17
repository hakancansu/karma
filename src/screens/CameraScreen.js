import React, { useContext, useState } from "react";
import {
  ImageBackground,
  View,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import LoginButton from "../components/LoginButton";
import Camera from "../components/Camera";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";
import { RegisterContext } from "../context/RegisterContext";
import ProgressBar from "../components/ProgressBar";

const CameraScreen = ({ navigation }) => {
  const layoutStyle = LayoutStyle();

  const { register, setRegister } = useContext(RegisterContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white, paddingHorizontal: 15}}>
      <ProgressBar loaded={ register.uri ? '75%' :'50%'} />

      <View
        style={{
          backgroundColor: color.black,
          borderRadius: 20,
          paddingHorizontal: 20,
          height: 450,
          marginTop: 50,
          paddingTop: 80,
          paddingBottom: 25,
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              color: color.white,
              textAlign: "center",
              fontWeight: "100",
            },
            layoutStyle.h5,
          ]}
        >
          {texts.photograph}
        </Text>
        <Camera
          onChange={(item) => {
            setRegister({ ...register, uri: item.uri });
          }}
          value={register?.uri}
        />
        <LoginButton
          disabled={register.uri ? false : true}
          backgroundColor={color.white}
          onPress={() => {
            navigation.navigate("Password");
          }}
          text="Devam Et"
          style={{ marginTop: 90 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
