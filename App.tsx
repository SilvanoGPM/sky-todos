import React from "react";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";

import { ThemeProvider } from "./context/ThemeContext";
import { Todo } from "./screens/Todo";

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <RootSiblingParent>
        <Todo />
      </RootSiblingParent>
    </ThemeProvider>
  );
}
