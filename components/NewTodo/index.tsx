import React, { FC, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { v4 as uuid } from "uuid";

import { ThemesEnum } from "../../context/SettingsContext";

import { validateTodoTitle } from "../../utils/validateTodoTitle";

import { colorThemes } from "../../colorTheme";
import { getStyles } from "./styles";
import { TodoType } from "../../types/types";

type NewTodoProps = {
  theme: ThemesEnum;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const NewTodo: FC<NewTodoProps> = ({ theme, setTodos }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function insertTodo() {
    const validTodo = validateTodoTitle(todoTitle);

    if (validTodo) {
      const newTodo: TodoType = {
        id: uuid(),
        title: validTodo,
        createdDate: Date.now(),
        finished: false,
      };

      setTodos((todos) => [newTodo, ...todos]);
      setTodoTitle("");
    }
  }

  return (
    <View style={styles.newTodo}>
      <TextInput
        style={styles.newTodo__input}
        placeholder="Título do TODO"
        placeholderTextColor={colorTheme.newTodo.inputColor}
        value={todoTitle}
        onChangeText={setTodoTitle}
      />

      <TouchableOpacity onPress={insertTodo} style={styles.newTodo__icon}>
        <Icon name="plus" size={20} color={colorTheme.newTodo.iconColor} />
      </TouchableOpacity>
    </View>
  );
};
