import "react-native-get-random-values";

import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ThemeContext } from "../../context/ThemeContext";
import { Header } from "./components/Header";
import { NewTodo } from "./components/NewTodo";
import { UpdateTodo } from "./components/UpdateTodo";
import { TodosList } from "../../components/TodosList";

import Repository from "../../lib/Repository";

import { getStyles } from "./styles";
import { TodoContext } from "../../context/TodoContext";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

export function ShowTodos() {
  const { theme } = useContext(ThemeContext);
  const { todos, setTodos } = useContext(TodoContext);

  const [selectedTodo, setSelectedTodo] = useState<TodoType>({} as TodoType);

  function handleSelectedTodo(todo: TodoType) {
    return () => {
      setSelectedTodo(todo);
    };
  }

  const styles = getStyles(theme);
  const statusBarTheme = theme === "dark" ? "light" : "dark";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style={statusBarTheme} />

      <Header theme={theme} />

      <NewTodo theme={theme} setTodos={setTodos} />

      <UpdateTodo
        selectedTodo={selectedTodo}
        theme={theme}
        todos={todos}
        setSelectedTodo={setSelectedTodo}
        setTodos={setTodos}
      />

      <TodosList
        todos={todos}
        loading={false}
        theme={theme}
        setTodos={setTodos}
        handleSelectedTodo={handleSelectedTodo}
        emptyTodosMessage="Lista está vazia..."
      />
    </SafeAreaView>
  );
}
