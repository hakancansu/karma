import React, { useEffect, useState } from "react";
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

export const Likes = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.uid+'/')
      .onSnapshot((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        const currentUser = [];
        querySnapshot.forEach((doc) => {
          const { name, birthday, uid } = doc.data();
          currentUser.push({
            name,
            birthday,
            uid,
          });
        });
        console.log(currentUser, 'user');
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
  useEffect(() => {
    const storageRef = firebase.storage().ref();
    const starsRef = storageRef.child("avatar/" + item.uid);
    starsRef.getDownloadURL().then((uri) => setUri(uri));
  }, []);

  return (
    <TouchableOpacity style={{width: '45%', height: 180, marginVertical: 10}}>
      {uri && (
        <ImageBackground
          source={{ uri: uri }}
          resizeMode="cover"
          style={{
            height: 180,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: 10
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
  );
};
