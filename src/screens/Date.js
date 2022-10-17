import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { CustomDatePicker } from "../components/CustomDatePicker";
import LoginButton from "../components/LoginButton";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";
import { RegisterContext } from "../context/RegisterContext";
import ProgressBar from "../components/ProgressBar";

const Date = ({ navigation }) => {
  const layoutStyle = LayoutStyle();
  const { register, setRegister } = useContext(RegisterContext);
  const [myDate, setMyDate] = useState(register?.birthday);
  const [birthday,setBirthday] = useState();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white, paddingHorizontal: 15}}>
      <ProgressBar loaded={ birthday ? '50%' :'25%'} />

      <View
        style={{
          backgroundColor: color.black,
          borderRadius: 20,
          paddingHorizontal: 20,
          height: 450,
          paddingTop: 80,
          marginTop: 50,
          paddingBottom: 25,
        }}
      >
        <Text
          style={[{
            marginTop:20,
            fontSize: 24,
            textAlign: "center",
            fontWeight: "100",
            color: color.white,
          },layoutStyle.h3]}
        >
          {texts.birthday}
        </Text>
        <CustomDatePicker
          value={myDate}
          onPress={(timestamp) => {
            setMyDate(timestamp);
            setBirthday(timestamp);
            // contexte timestampi kaydet
          }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <LoginButton
            onPress={() => {
              {
                navigation.navigate("CameraScreen"),
                  setRegister({ ...register, birthday: myDate });
              }
            }}
            backgroundColor={color.white}
            disabled={birthday ? false : true }
            text={"Devam et"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Date;
