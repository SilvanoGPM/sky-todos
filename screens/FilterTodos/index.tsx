import React, { FC, useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TodosList } from "../../components/TodosList";
import { ThemeContext } from "../../context/ThemeContext";
import { TodoContext } from "../../context/TodoContext";
import { colorThemes } from "../colorThemes";
import { getStyles } from "./styles";

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

  useEffect(() => {
    setTodos(originalTodos);
  }, [originalTodos]);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function resetTodos() {
    setTodosToFilter("");
    setTodos(originalTodos);
  }

  function filterTodos() {
    const clearedTodosToFilter = todosToFilter.trim().toLowerCase();

    if (clearedTodosToFilter) {
      const newTodos = originalTodos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(clearedTodosToFilter)
      );

      setTodos(newTodos);
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

      {todos.length !== originalTodos.length && (
        <>
          <TouchableOpacity style={styles.filter__close} onPress={resetTodos}>
            <Text>
              <Icon
                name="remove"
                size={40}
                color={colorTheme.filter.closeIconColor}
              />
            </Text>
          </TouchableOpacity>

          <View>
            <Text>Pesquisando por: {todosToFilter}</Text>
          </View>
        </>
      )}

      <TodosList
        setTodos={setTodos}
        theme={theme}
        todos={todos}
        emptyTodosMessage="Nada encontrado..."
      />
    </View>
  );
};
