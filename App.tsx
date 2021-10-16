import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { SettingsProvider } from "./context/SettingsContext";
import { TodoProvider } from "./context/TodoContext";
import { Screens } from "./screens";

export default function App() {
  return (
    <NavigationContainer>
      <SettingsProvider>
        <TodoProvider>
          <Screens />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </TodoProvider>
      </SettingsProvider>
    </NavigationContainer>
  );
}
