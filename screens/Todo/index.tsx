import "react-native-get-random-values";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { NewTodo } from "./components/NewTodo";
import { UpdateTodo } from "./components/UpdateTodo";
import { TodosList } from "./components/TodosList";

import Repository from "../../lib/Repository";

import styles from "./styles";
import { Header } from "./components/Header";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

const TODOS_KEY = "@SkyG0D::todos";

const repository = new Repository();

export function Todo() {
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
  }, [todos]);

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

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <NewTodo setTodos={setTodos} />

      <UpdateTodo
        selectedTodo={selectedTodo}
        todos={todos}
        setSelectedTodo={setSelectedTodo}
        setTodos={setTodos}
      />

      <TodosList
        todos={todos}
        loading={loading}
        setTodos={setTodos}
        handleSelectedTodo={handleSelectedTodo}
      />
    </SafeAreaView>
  );
}
