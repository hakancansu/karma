import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "../LayoutStyle";
import { texts } from "../Texts";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import CameraScreen from "../screens/CameraScreen";
import WelcomeCarma from "../screens/WelcomeCarma";
import Date from "../screens/Date";
import Password from "../screens/Password";
import { HomePage } from "../screens/HomePage";
import { AuthenticationContext } from "../context/AuthenticationContext";
import firebaseConfig from "../firebase/config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Likes } from "../screens/Likes";
import LoginButton from "../components/LoginButton";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.white,
        headerShown: false,
        tabBarIconStyle: { display: "none" },
        tabBarItemStyle: {
          backgroundColor: color.purple,
          margin: 5,
          borderRadius: 10,
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Tab.Screen
        options={{ title: "Kullanıcılar" }}
        name="HomePage"
        component={HomePage}
      />
      <Tab.Screen name="Likes" component={Likes} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
// const LoginStack = () => {
//   const { isAuthenticated } = useContext(AuthenticationContext);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Tabs" component={Tabs} />
//     </Stack.Navigator>
//   );
// };

const RegisterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeCarma"
        component={WelcomeCarma}
        options={{ title: "kayıt ol" }}
      />
      <Stack.Screen
        name="Date"
        component={Date}
        options={{ title: "kayıt ol" }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "kayıt ol" }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{ title: "kayıt ol" }}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    //<NavigationContainer>
    //    <Stack.Navigator>
    //    <Stack.Screen name="Login" component={Login} />
    //    <Stack.Screen name="HomePage" component={HomePage} />
    //    </Stack.Navigator>
    //  </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="LoginStack" component={Tabs} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="RegisterStack" component={RegisterStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
