import { StatusBar } from "expo-status-bar";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { ThemeProvider } from "./context/ThemeContext";

import { Todo } from "./screens/Todo";

export default function App() {
  return (
    <ThemeProvider>
      <RootSiblingParent>
        <Todo />
      </RootSiblingParent>
    </ThemeProvider>
  );
}

// TODO: Arrumar mensagens.
// TODO: Arrumar os imports.
// TODO: Filtar TODOs.
