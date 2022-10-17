import React from "react";
import { ImageBackground, View, Dimensions, Text } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LoginButton from "../components/LoginButton";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";

const WIDTH = Dimensions.get("screen").width;

const Welcome = ({ navigation }) => {
  const layoutStyle = LayoutStyle();
  return (
    <View style={{ backgroundColor: color.white, flex: 1, }}>
      <ImageBackground
        source={require("../assets/image/Stars.png")}
        resizeMode="cover"
        style={{
          width: WIDTH,
          height: 375,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 150,
        }}
      >
        <Text
          style={[{ textAlign: "center", fontWeight: "bold" }, layoutStyle.h1]}
        >
          {texts.welcome_text}
        </Text>
        <Text
          style={[{
            textAlign: "center",
            fontWeight: "100",
            marginTop: 10,
          },layoutStyle.h5]}
        >
          {texts.discover_yourself}
        </Text>
      </ImageBackground>
      <LoginButton
        style={{ marginRight: 14, marginLeft: 15, marginTop: 100 }}
        text=" Giriş Yap "
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <LoginButton
        style={{
          marginTop: 25,
          marginRight: 14,
          marginLeft: 15,
          marginBottom: 18,
        }}
        text=" Hesap Oluştur "
        onPress={() => {
          navigation.navigate("RegisterStack");
        }}
      />
      <Text style={[{  textAlign: "center", fontWeight: "100" },layoutStyle.h6,]}>
        {texts.agreement}
      </Text>
    </View>
  );
};

export default Welcome;
