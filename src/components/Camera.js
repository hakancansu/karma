import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample({ onChange, value }) {
  const [image, setImage] = useState(value);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    onChange(result);

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
