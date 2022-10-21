import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LoginButton from "../components/LoginButton";
import { color, LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";
import { RegisterContext } from "../context/RegisterContext";
import firebase from "firebase/app";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AuthenticationContext } from "../context/AuthenticationContext";
import ProgressBar from "../components/ProgressBar";
import { LoaderContext } from "../context/LoaderContext";

const Password = () => {
  const layoutStyle = LayoutStyle();
  const { register, setRegister } = useContext(RegisterContext);
  const { setAuthenticated, setUser } = useContext(AuthenticationContext);
  const [password, setPassword] = useState("");
  const [approval, setApproval] = useState(false);
  const storageRef = firebase.storage().ref();
  const { setLoader } = useContext(LoaderContext);

  const uploadFile = async (id) => {
    if (register.uri == null) return;
    const response = await fetch(register.uri);
    const blop = await response.blob();
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
      .catch((e) => console.log(e));
  };

  const go = () => {
    setLoader(true)
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
        setLoader(false);
      });
  };

  const readApproval = () => {
    setApproval(true);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: color.white, paddingHorizontal: 15 }}
    >
      <ScrollView>
        <ProgressBar loaded={"100%"} />

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
            {approval ? (
              <Ionicons
                name="checkbox-outline"
                size={24}
                color="black"
                onPress={() => setApproval(false)}
                style={{ marginTop: 32 }}
              />
            ) : (
              <MaterialIcons
                style={{ marginTop: 32 }}
                name="check-box-outline-blank"
                size={24}
                color="black"
                onPress={() => readApproval()}
              />
            )}

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
            disabled={password.length < 6 || !approval}
            backgroundColor={color.white}
            onPress={() => {
              go();
            }}
            text="Tamamla"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Password;
