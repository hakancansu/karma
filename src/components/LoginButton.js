import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { color, LayoutStyle } from "../LayoutStyle";

const LoginButton = ({ style, onPress, text, textStyle, disabled, backgroundColor = color.purple }) => {
  const layoutStyle = LayoutStyle();
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: disabled ? color.ink : backgroundColor,
          marginTop: 30,
          borderRadius: 10,
          height: 50,
          justifyContent: "center",
          padding: 10,
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      text={text}
    >
      <Text style={[layoutStyle.p3, { color: color.black }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
