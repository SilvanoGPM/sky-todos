import React from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { SettingsProvider } from "./context/SettingsContext";
import { TodoProvider } from "./context/TodoContext";
import { Screens } from "./screens";

export default function App() {
  return (
    <NavigationContainer>
      <SettingsProvider>
        <TodoProvider>
          <StatusBar style="light" />

          <Screens />

          <Toast ref={(ref) => Toast.setRef(ref)} />
        </TodoProvider>
      </SettingsProvider>
    </NavigationContainer>
  );
}
