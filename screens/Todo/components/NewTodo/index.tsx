import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TextInput, TouchableOpacity } from "react-native";

import { v4 as uuid } from "uuid";

import { validateTodoTitle } from "../../../../utils/validateTodoTitle";

import { colorThemes } from "../../colorThemes";
import styles from "./styles";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type NewTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
};

export const NewTodo: FC<NewTodoProps> = ({ setTodos }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  function insertTodo() {
    const validTodo = validateTodoTitle(todoTitle);

    if (validTodo) {
      const newTodo = {
        id: uuid(),
        title: validTodo,
        finished: false,
      };

      setTodos((todos) => [newTodo, ...todos]);

      if (setTodoTitle) {
        setTodoTitle("");
      }
    }
  }

  return (
    <View style={styles.newTodo}>
      <TextInput
        style={styles.newTodo__input}
        placeholder="Título do a fazer"
        placeholderTextColor={colorThemes.light.newTodo}
        value={todoTitle}
        onChangeText={setTodoTitle}
      />

      <TouchableOpacity onPress={insertTodo} style={styles.newTodo__icon}>
        <Icon name="plus" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};
