import React, { useContext, useState } from "react";
import { ImageBackground, View, Dimensions, Text } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LoginButton from "../components/LoginButton";
import { color } from "../LayoutStyle";
import { texts } from "../Texts";
import firebase from "firebase/app";
import { RegisterContext } from "../context/RegisterContext";

const WIDTH = Dimensions.get("screen").width;

const Login = ({ navigation }) => {
  const { register, setRegister } = useContext(RegisterContext);
  const [name, setName] = useState(register?.name);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={{ backgroundColor: color.black, flex: 1 }}>
      <Text
        style={{
          fontSize: 27,
          color: color.white,
          textAlign: "center",
          fontWeight: "100",
          marginTop: 183,
        }}
      >
        {texts.login_welcome}
      </Text>
      <Text
        style={{
          fontSize: 18,
          color: color.white,
          textAlign: "center",
          fontWeight: "100",
        }}
      >
        {texts.login_text}
      </Text>
      <CustomTextInput value={email} onChangeText={(e) => setEmail(e)} />
      <CustomTextInput value={password} onChangeText={(e) => setPassword(e)} />
      <LoginButton
        text="Giriş Yap"
        style={{ marginTop: 372, backgroundColor: color.white }}
        onPress={() => {createAccount(), navigation.navigate("HomePage");}}
      />
    </View>
  );
};

export default Login;