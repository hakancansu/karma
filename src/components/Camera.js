import React, { useState, useContext } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { color } from "../LayoutStyle";
import { texts } from "../Texts";
import LoginButton from "./LoginButton";
import { RegisterContext } from "../context/RegisterContext";


export default function ImagePickerExample({onChange, value}) {
  const [image, setImage] = useState(value);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     //console.log(result);
     onChange(result)

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A1624",
      }}
    >
      <TouchableOpacity
      onPress={pickImage}
        style={{
          width: 178,
          height: 178,
          backgroundColor: "#DBD2FF",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        {image ? (
          image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 178,
                height: 178,
                borderRadius: 10,
                borderWidth: 3,
                borderColor: "#ffffff",
              }}
            />
          )
        ) : (
            <Image source={require("../assets/image/Vector.png")} />
        )}
      </TouchableOpacity>
    </View>
  );
}
