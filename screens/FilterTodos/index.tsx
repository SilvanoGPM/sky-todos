import React, { useContext, useEffect, useState } from "react";
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

export function FilterTodos() {
  const { theme } = useContext(ThemeContext);
  const { todos: originalTodos } = useContext(TodoContext);

  const [todosToFilter, setTodosToFilter] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(originalTodos);
  const [filtering, setFiltering] = useState<boolean>(false);

  useEffect(() => {
    setTodos(originalTodos);
  }, [originalTodos]);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function resetTodos() {
    setTodosToFilter("");
    setFiltering(false);
    setTodos(originalTodos);
  }

  function filterTodos() {
    const clearedTodosToFilter = todosToFilter.trim().toLowerCase();

    if (clearedTodosToFilter) {
      const newTodos = originalTodos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(clearedTodosToFilter)
      );

      setFiltering(true);
      setTodos(newTodos);
    }
  }

  return (
    <View style={styles.container}>
      {!filtering && (
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
      )}

      {filtering && (
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

          {todos.length > 0 && (
            <View>
              <Text style={styles.filter__search__text}>
                Pesquisando por: "{todosToFilter}"
              </Text>
              <Text style={styles.filter__results}>
                {todos.length} resultados encontrados...
              </Text>
            </View>
          )}
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
}
