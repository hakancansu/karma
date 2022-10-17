import React, { useState } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoginButton from "./LoginButton";
import { color } from "../LayoutStyle";

export const CustomDatePicker = ({ onPress, value }) => {
  const [date, setDate] = useState(value);
  const [open, setOpen] = useState(false);
  const getTitle = () => {
    if (!date) {
      return "seçiniz";
    }
    const currentDate = new Date(date);
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
      <LoginButton
        backgroundColor={color.white}
        text={getTitle()}
        onPress={() => {
          setOpen(true);
        }}
      />
      {open && (
        <DateTimePicker
          onChange={(item) => {
            setOpen(false);
            setDate(item.nativeEvent.timestamp);
            onPress(item.nativeEvent.timestamp);
          }}
          display="default"
          mode="date"
          value={date ? new Date(date) : new Date()}
        />
      )}
    </View>
  );
};
