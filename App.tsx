import React from "react";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { TodosWrapper } from "./screens/TodosWrapper";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StatusBar style="light" />
        <TodosWrapper />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ThemeProvider>
    </NavigationContainer>
  );
}
