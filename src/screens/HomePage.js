import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
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
import { LinearGradient } from "expo-linear-gradient";
import { LoaderContext } from "../context/LoaderContext";

const ModalPoup = ({ visible, user, onClose, onSend }) => {
  const layoutStyle = LayoutStyle();

  const send = () => {
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.uid + "/")
      .add({ ...user })
      .finally(() => {
        onSend();
        onClose();
      });
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
            textStyle={{ color: color.white }}
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
            textStyle={{ color: color.ink }}
            style={{
              marginTop: 5,
              marginRight: 14,
              marginLeft: 15,
              marginBottom: 18,
              backgroundColor: color.white,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export const HomePage = () => {
  const [users, setUsers] = useState();
  const { setLoader } = useContext(LoaderContext);
  const getUsers = () => {
    setLoader(true);
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
        firebase
          .firestore()
          .collection(firebase.auth().currentUser.uid + "/")
          .onSnapshot((querySnapshot) => {
            const userUid = firebase.auth().currentUser.uid;
            const likedUsers = [userUid];
            querySnapshot.forEach((doc) => {
              const { uid } = doc.data();
              likedUsers.push(uid);
            });
            const shownUser = currentUser.filter(
              (first) => !likedUsers.includes(first.uid)
            );
            setUsers(shownUser);
            setLoader(false);
          });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ paddingHorizontal: 15, flex: 1, backgroundColor: "#F5F5F5" }}
      >
        <FlatList
          data={users}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <RenderItem item={item} onSend={getUsers} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const RenderItem = ({ item, onSend }) => {
  const [uri, setUri] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const storageRef = firebase.storage().ref();
    const starsRef = storageRef.child("avatar/" + item.uid);
    starsRef.getDownloadURL().then((uri) => setUri(uri));
  }, []);

  return (
    <View
      style={{
        width: "45%",
        height: 180,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity onPress={() => setVisible(true)}>
        {uri && (
          <ImageBackground
            source={{ uri: uri }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 5 }}
            style={{
              height: 180,
            }}
          >
            <LinearGradient
              colors={["transparent", "transparent", color.purple]}
              start={{ x: 0.5, y: 0.2 }}
              style={{
                borderRadius: 5,
                flex: 1,
                padding: 10,
                alignContent: "flex-start",
                justifyContent: "flex-end",
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
            </LinearGradient>
          </ImageBackground>
        )}
      </TouchableOpacity>

      <ModalPoup
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        user={item}
        onSend={onSend}
      />
    </View>
  );
};
