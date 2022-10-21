import React from "react";
import { ImageBackground, Dimensions, Text, ScrollView } from "react-native";
import LoginButton from "../components/LoginButton";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";

const WIDTH = Dimensions.get("screen").width;

const Welcome = ({ navigation }) => {
  const layoutStyle = LayoutStyle();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.white }}>
      <ImageBackground
        source={require("../assets/image/Stars.png")}
        resizeMode="cover"
        style={{
          width: WIDTH,
          height: 375,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40%",
        }}
      >
        <Text
          style={[{ textAlign: "center", fontWeight: "bold" }, layoutStyle.h1]}
        >
          {texts.welcome_text}
        </Text>
        <Text
          style={[
            {
              textAlign: "center",
              fontWeight: "100",
              marginTop: 10,
            },
            layoutStyle.h5,
          ]}
        >
          {texts.discover_yourself}
        </Text>
      </ImageBackground>
      <LoginButton
        style={{ marginRight: 14, marginLeft: 15, marginTop: "10%" }}
        text=" Giriş Yap "
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <LoginButton
        style={{
          marginRight: 14,
          marginLeft: 15,
          marginBottom: "5%",
        }}
        text=" Hesap Oluştur "
        onPress={() => {
          navigation.navigate("RegisterStack");
        }}
      />
      <Text
        style={[{ textAlign: "center", fontWeight: "100" }, layoutStyle.h6]}
      >
        {texts.agreement}
      </Text>
    </ScrollView>
  );
};

export default Welcome;
