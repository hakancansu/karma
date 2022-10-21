import React from "react";
import { TextInput } from "react-native";
import { color } from "../LayoutStyle";

const CustomTextInput = ({
  style,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={[
        {
          backgroundColor: color.white,
          justifyContent: "center",
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 10,
          borderRadius: 10,
          borderColor: color.purple_light,
          borderWidth: 1,
          height: 50,
        },
        style,
      ]}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={color.ink}
      placeholder={placeholder}
    ></TextInput>
  );
};

export default CustomTextInput;
