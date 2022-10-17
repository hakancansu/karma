import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welcome";
import ImagePickerExample from "./src/components/Camera";
import CameraScreen from "./src/screens/CameraScreen";
import WelcomeCarma from "./src/screens/WelcomeCarma";
import Password from "./src/screens/Password";
import Main from "./src/navigations";
import Date from "./src/screens/Date";
import { CustomDatePicker } from "./src/components/CustomDatePicker";
import { useState } from "react";
import { RegisterProvider } from "./src/context/RegisterContext";
import { AuthenticationProvider } from "./src/context/AuthenticationContext";

export default function App() {
  return (
    <AuthenticationProvider>
      <RegisterProvider>
        <View style={styles.container}>
          <Main />
        </View>
      </RegisterProvider>
    </AuthenticationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
