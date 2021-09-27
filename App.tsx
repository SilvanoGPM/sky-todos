import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings'

import { Todo } from './components/Todo';

export default function App() {
  return (
    <RootSiblingParent>
      <Todo />
    </RootSiblingParent>
  );
}
