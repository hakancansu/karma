import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import LoginButton from "../components/LoginButton";
import { texts } from "../Texts";
import CustomTextInput from "../components/CustomTextInput";
import { color, LayoutStyle } from "../LayoutStyle";
import { RegisterContext } from "../context/RegisterContext";
import ProgressBar from "../components/ProgressBar";

const WelcomeCarma = ({ navigation }) => {
  const layoutStyle = LayoutStyle();
  const { register, setRegister } = useContext(RegisterContext);
  const [name, setName] = useState(register?.name);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.white, paddingHorizontal: 15}}>
      <ProgressBar loaded={'0%'} />
      <View
        style={{
          backgroundColor: color.black,
          borderRadius: 20,
          paddingHorizontal: 20,
          height: 450,
          paddingTop: 80,
          paddingBottom: 25,
          marginTop: 50
        }}
      >
        <Text
          style={[{
            textAlign: "center",
            fontWeight: "100",
            color: color.white,
          },layoutStyle.h2]}
        >
          {texts.welcome_karma}
        </Text>
        <Text
          style={[{
            textAlign: "center",
            fontWeight: "100",
            color: color.white,
          },layoutStyle.h5]}
        >
          {texts.appeal}
        </Text>
        <CustomTextInput
          value={name}
          style={{ marginTop: 80 }}
          onChangeText={(e) => setName(e)}
          placeholder={"kullanıcı adı"}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <LoginButton
            onPress={() => {
              {
                setRegister({...register, name: name});
                navigation.navigate("Date");
              }
            }}
            style={{ backgroundColor: color.white }}
            text={"devam et"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeCarma;
