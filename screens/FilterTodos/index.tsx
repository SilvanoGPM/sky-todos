import React, { FC, useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { ThemeContext, ThemesEnum } from "../../context/ThemeContext";

import { colorThemes } from "../colorThemes";

import { getStyles } from "./styles";
import { TodosList } from "../../components/TodosList";
import { TodoContext } from "../../context/TodoContext";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

export const FilterTodos: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { todos: originalTodos } = useContext(TodoContext);

  const [todosToFilter, setTodosToFilter] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(originalTodos);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function filterTodos() {
    const clearedTodosToFilter = todosToFilter.trim().toLowerCase();

    if (clearedTodosToFilter) {
      const newTodos = originalTodos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(clearedTodosToFilter)
      );

      setTodos(newTodos);
      setTodosToFilter("");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <TextInput
          value={todosToFilter}
          onChangeText={setTodosToFilter}
          style={styles.filter__input}
          placeholder="Pesquisar por TODOs"
          placeholderTextColor={colorTheme.filter.inputColor}
        />

        <TouchableOpacity style={styles.filter__send} onPress={filterTodos}>
          <Icon name="search" size={20} color={colorTheme.filter.iconColor} />
        </TouchableOpacity>
      </View>

      {Boolean(todosToFilter) && (
        <TouchableOpacity
          style={styles.filter__close}
          onPress={() => setTodosToFilter("")}
        >
          <Text>
            <Icon
              name="remove"
              size={40}
              color={colorTheme.filter.closeIconColor}
            />
          </Text>
        </TouchableOpacity>
      )}

      <TodosList
        handleSelectedTodo={(todo) => () => {}}
        loading={false}
        setTodos={setTodos}
        theme={theme}
        todos={todos}
        emptyTodosMessage="Nada encontrado..."
      />
    </View>
  );
};
