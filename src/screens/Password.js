import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LoginButton from "../components/LoginButton";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";
import { RegisterContext } from "../context/RegisterContext";
import firebase from "firebase/app";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthenticationContext } from "../context/AuthenticationContext";
import ProgressBar from "../components/ProgressBar";

const Password = ({ navigation }) => {
  const layoutStyle = LayoutStyle();
  const { register, setRegister } = useContext(RegisterContext);
  const { setAuthenticated, setUser } = useContext(AuthenticationContext);

  const [password, setPassword] = useState("");
  const storageRef = firebase.storage().ref();

  const uploadFile = async (id) => {
    if (register.uri == null) return;
    const response = await fetch(register.uri);
    const blop = await response.blob();
    console.log("asdasd________________________________");
    firebase.storage().ref(`avatar/${id}`).g;
    firebase
      .storage()
      .ref(`avatar/${id}`)
      .put(blop, { contentType: "image/jpeg" })
      .then((snapshot) =>
        snapshot.ref.getDownloadURL().then((url) => {
          console.log("downloadURL", url);
        })
      )
      .catch((e) => console.log(e, "eeee"));
  };

  const go = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(register.name, password)
      .then((item) => {
        setUser({ uid: item.user.uid });
        const uid = item.user.uid;
        firebase
          .firestore()
          .doc("users/" + uid)
          .set({ ...register, uid: uid });
        uploadFile(uid).then(() => setAuthenticated(true));
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white, paddingHorizontal: 15}}>
      <ProgressBar loaded={'100%'} />

      <View
        style={{
          backgroundColor: "#1A1624",
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
              textAlign: "center",
              fontWeight: "100",
              color: color.white,
            },
            layoutStyle.h3,
          ]}
        >
          {texts.password}
        </Text>
        <CustomTextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
          style={{ marginTop: 60 }}
          secureTextEntry={true}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <MaterialIcons
            style={{ marginTop: 32 }}
            name="check-box-outline-blank"
            size={24}
            color="black"
          />
          <Text
            style={[
              {
                fontSize: 13,
                fontWeight: "100",
                color: color.white,
                marginTop: 30,
              },
              layoutStyle.h6,
            ]}
          >
            {texts.terms_of_use}
          </Text>
        </View>
        <LoginButton
          disabled={password.length < 6}
          backgroundColor={color.white}
          onPress={() => {
            // setRegister({ ...register, password: password });
            // navigation.navigate("HomePage");
            go();
          }}
          text="Tamamla"
        />
      </View>
    </SafeAreaView>
  );
};

export default Password;
