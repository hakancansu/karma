import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Main from "./src/navigations";
import { RegisterProvider } from "./src/context/RegisterContext";
import { AuthenticationProvider } from "./src/context/AuthenticationContext";
import { LoaderProvider } from "./src/context/LoaderContext";

export default function App() {
  return (
    <LoaderProvider>
      <AuthenticationProvider>
        <RegisterProvider>
          <View style={styles.container}>
            <StatusBar />
            <Main />
          </View>
        </RegisterProvider>
      </AuthenticationProvider>
    </LoaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
