import React from "react";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { ThemeProvider } from "./context/ThemeContext";
import { Todo } from "./screens/Todo";

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Todo />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ThemeProvider>
  );
}
