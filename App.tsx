import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings'

import { Todo } from './screens/Todo';

export default function App() {
  return (
    <RootSiblingParent>
      <Todo />
    </RootSiblingParent>
  );
}

// TODO: Adicionar temas.
// TODO: Arrumar mensagens.
// TODO: Filtro de fazeres.
// TODO: Agendar notificações para TODOs.
