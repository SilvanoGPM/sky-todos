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

// TODO: Refatorar folhas de estilo.
// TODO: Arrumar mensagens.
// TODO: Filtro de fazeres.
// TODO: Agendar notificações para TODOs.
