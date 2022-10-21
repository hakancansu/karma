import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { LayoutStyle } from "../LayoutStyle";
import CustomTextInput from "../components/CustomTextInput";
import LoginButton from "../components/LoginButton";
import { color } from "../LayoutStyle";
import { texts } from "../Texts";
import firebase from "firebase/app";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { LoaderContext } from "../context/LoaderContext";

const Login = () => {
  const layoutStyle = LayoutStyle();
  const { setAuthenticated, setUser } = useContext(AuthenticationContext);
  const [messageError, setMessageError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoader } = useContext(LoaderContext);

  const signIn = async () => {
    setLoader(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((item) => {
        setUser({ uid: item.user.uid });
        setAuthenticated(true);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setMessageError("hatalı kullanıcı adı ya da parola");
      });
  };

  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <View
        style={{
          marginHorizontal: 15,
          backgroundColor: "#1A1624",
          borderRadius: 20,
          paddingHorizontal: 20,
          height: 450,
          paddingTop: 80,
          paddingBottom: 25,
        }}
      >
        <Text
          style={[
            {
              color: color.white,
              textAlign: "center",
              fontWeight: "100",
            },
            layoutStyle.h2,
          ]}
        >
          {texts.login_welcome}
        </Text>
        <Text
          style={[
            {
              color: color.white,
              textAlign: "center",
              fontWeight: "100",
            },
            layoutStyle.h5,
          ]}
        >
          {texts.login_text}
        </Text>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <CustomTextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder={"kullanıcı adı"}
          />
          <CustomTextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder={"parola"}
            secureTextEntry={true}
          />
        </View>
        <Text style={{ color: "red", textAlign: "center" }}>
          {messageError}
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <LoginButton
            text="Giriş Yap"
            style={{ backgroundColor: color.white }}
            onPress={() => {
              signIn();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
