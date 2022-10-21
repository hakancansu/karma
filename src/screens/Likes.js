import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { color } from "../LayoutStyle";
import firebase from "firebase/app";
import BirthdayText from "../components/BirthdayText";
import { LinearGradient } from "expo-linear-gradient";
import { LoaderContext } from "../context/LoaderContext";

export const Likes = () => {
  const [users, setUsers] = useState();
  const { setLoader } = useContext(LoaderContext);
  useEffect(() => {
    setLoader(true);
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.uid + "/")
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
        setLoader(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
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
    <View
      style={{
        width: "45%",
        height: 180,
        marginVertical: 10,
      }}
    >
      {uri && (
        <ImageBackground
          source={{ uri: uri }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 5 }}
          style={{
            height: 180,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            colors={["transparent", "transparent", "#D6052B"]}
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
    </View>
  );
};
