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

  useEffect(() => {
    async function persitsTodos() {
      if (!loading) {
        await repository.save(TODOS_KEY, todos);
      }
    }

    persitsTodos();
  }, [todos, loading]);

  useEffect(() => {
    async function loadTodos() {
      const todos = await repository.get(TODOS_KEY);

      if (todos) {
        setTodos(todos);
      }

      setLoading(false);
    }

    loadTodos();
  }, []);

  function handleSelectedTodo(todo: TodoType) {
    return () => {
      setSelectedTodo(todo);
    };
  }

  const styles = getStyles(theme);
  const statusBarTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style={statusBarTheme} />

      <Settings />

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
        loading={loading}
        theme={theme}
        setTodos={setTodos}
        handleSelectedTodo={handleSelectedTodo}
      />
    </SafeAreaView>
  );
}
