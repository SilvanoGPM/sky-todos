import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import { TOAST_VISIBILITY_TIME } from "../../globals";

import { TodoType } from "../../types/types";
import { TodosList } from "../../components/TodosList";
import { SettingsContext } from "../../context/SettingsContext";
import { TodoContext } from "../../context/TodoContext";

import { colorThemes } from "../../colorTheme";
import { getStyles } from "./styles";

export function FilterTodos() {
  const { theme } = useContext(SettingsContext).settings;
  const { todos: originalTodos, setTodos: setOriginalTodos } =
    useContext(TodoContext);

  const [todosToFilter, setTodosToFilter] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(originalTodos);
  const [filtering, setFiltering] = useState<boolean>(false);

  useEffect(() => {
    if (!filtering) {
      setTodos(originalTodos);
      return;
    }

    const previousTodos = originalTodos.filter((todo) =>
      todos.map(({ id }) => id).includes(todo.id)
    );

    setTodos(previousTodos);
  }, [originalTodos]);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function handleSwitchClick(id: string) {
    return () => {
      const newTodos = originalTodos.map((todo) =>
        todo.id === id
          ? { ...todo, finished: !todo.finished, finishedDate: Date.now() }
          : todo
      );

      setOriginalTodos(newTodos);
    };
  }

  function handleRemoveClick(id: string) {
    function exec() {
      const newTodos = originalTodos.filter((todo) => todo.id !== id);
      setOriginalTodos(newTodos);

      Toast.show({
        type: "success",
        text1: "TODO foi removido!",
        visibilityTime: TOAST_VISIBILITY_TIME.short,
        position: "bottom",
      });
    }

    return () => {
      Alert.alert("Excluir TODO", "Tem certeza que deseja excuir esse TODO?", [
        { text: "Não" },
        { text: "Sim", onPress: exec },
      ]);
    };
  }

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
        handleRemoveClick={handleRemoveClick}
        handleSwitchClick={handleSwitchClick}
      />
    </View>
  );
}
