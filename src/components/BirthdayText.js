import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../LayoutStyle";

const BirthdayText = ({ timestamp }) => {
  const getTitle = () => {
    const currentDate = new Date(timestamp);
    return (
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear()
    );
  };
  return (
    <View>
      <Text
        style={{
          color: color.white,
        }}
      >
        {getTitle()}
      </Text>
    </View>
  );
};

export default BirthdayText;

const styles = StyleSheet.create({});
