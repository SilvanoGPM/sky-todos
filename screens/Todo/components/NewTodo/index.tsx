import React, { FC, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TextInput, TouchableOpacity } from "react-native";

import { v4 as uuid } from "uuid";

import { validateTodoTitle } from "../../../../utils/validateTodoTitle";

import { colorThemes } from "../../colorThemes";
import { getStyles } from "./styles";
import { ThemesEnum } from "../../../../context/ThemeContext";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type NewTodoProps = {
  theme: ThemesEnum;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
};

export const NewTodo: FC<NewTodoProps> = ({ theme, setTodos }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

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
        placeholderTextColor={colorTheme.newTodo.inputColor}
        value={todoTitle}
        onChangeText={setTodoTitle}
      />

      <TouchableOpacity onPress={insertTodo} style={styles.newTodo__icon}>
        <Icon name="plus" size={30} color={colorTheme.newTodo.iconColor} />
      </TouchableOpacity>
    </View>
  );
};
