import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { color } from "../LayoutStyle";
import LoginButton from "../components/LoginButton";
import firebase from "firebase/app";

import { LayoutStyle } from "../LayoutStyle";
import { texts } from "../Texts";
import BirthdayText from "../components/BirthdayText";

const ModalPoup = ({ visible, user, onClose }) => {
  const layoutStyle = LayoutStyle();

  const send = () => {
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.uid + "/")
      .add({ ...user })
      .finally(onClose);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 50,
            justifyContent: "center",
            backgroundColor: color.white,
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={[
              { textAlign: "center", fontWeight: "bold", marginHorizontal: 20 },
              layoutStyle.p3,
            ]}
          >
            {user.name} {texts.request_friends}
          </Text>
          <LoginButton
            text="Gönder"
            textStyle={{color:color.white}}
            onPress={() => send()}
            style={{
              marginTop: 25,
              marginRight: 14,
              marginLeft: 15,
            }}
          />
          <LoginButton
            text="Vazgec"
            onPress={onClose}
            textStyle={{color:color.ink}}
            style={{
              marginTop: 5,
              marginRight: 14,
              marginLeft: 15,
              marginBottom: 18,
              backgroundColor: color.white
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export const HomePage = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const currentUser = [];
        querySnapshot.forEach((doc) => {
          const { name, birthday, uid } = doc.data();
          currentUser.push({
            name,
            birthday,
            uid,
          });
        });
        setUsers(currentUser);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{paddingHorizontal: 15, flex: 1}}>
      <FlatList
        data={users}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
      </View>
    </SafeAreaView>
  );
};

const RenderItem = ({ item }) => {
  const [uri, setUri] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storageRef = firebase.storage().ref();
    const starsRef = storageRef.child("avatar/" + item.uid);
    starsRef.getDownloadURL().then((uri) => setUri(uri));
  }, []);

  return (
    <View style={{ borderRadius: 50,width: '45%',
    height: 180, marginVertical: 10 }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {uri && (
          <ImageBackground
            source={{ uri: uri }}
            resizeMode="cover"
            style={{
              height: 180,
              alignContent: "flex-start",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: color.white,
              }}
            >
              {item.name}
            </Text>
            <BirthdayText timestamp={item.birthday} />
          </ImageBackground>
        )}
      </TouchableOpacity>
      <ModalPoup
        onClose={() => setVisible(false)}
        visible={visible}
        user={item}
      />
    </View>
  );
};
