import "react-native-get-random-values";

import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { ThemeContext } from "../../context/ThemeContext";
import { Settings } from "./components/Settings";
import { Header } from "./components/Header";
import { NewTodo } from "./components/NewTodo";
import { UpdateTodo } from "./components/UpdateTodo";
import { TodosList } from "./components/TodosList";

import Repository from "../../lib/Repository";

import { getStyles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { FilterTodos } from "./components/FilterTodos";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

const TODOS_KEY = "@SkyG0D::todos";

const repository = new Repository();

export function Todo() {
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<TodoType>({} as TodoType);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filtering, setFiltering] = useState<boolean>(false);

  useEffect(() => {
    async function persitsTodos() {
      if (!loading && !filtering) {
        await repository.save(TODOS_KEY, todos);
      }
    }

    persitsTodos();
  }, [todos, loading]);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const todos = await repository.get(TODOS_KEY);

    if (todos) {
      setTodos(todos);
    }

    setLoading(false);
    setFiltering(false);
  }

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

      <Settings />

      <Header theme={theme} />

      <NewTodo theme={theme} setTodos={setTodos} />

      <FilterTodos
        theme={theme}
        originalTodos={todos}
        setFiltering={setFiltering}
        loading={loading}
        filtering={filtering}
        handleSelectedTodo={handleSelectedTodo}
      />

      <UpdateTodo
        selectedTodo={selectedTodo}
        theme={theme}
        todos={todos}
        setSelectedTodo={setSelectedTodo}
        setTodos={setTodos}
      />

      {!filtering && (
        <TodosList
          todos={todos}
          loading={loading}
          theme={theme}
          setTodos={setTodos}
          handleSelectedTodo={handleSelectedTodo}
          emptyTodosMessage="Lista está vazia..."
        />
      )}
    </SafeAreaView>
  );
}
