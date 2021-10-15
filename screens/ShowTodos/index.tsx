import "react-native-get-random-values";

import { NavigationProp } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { FC, useContext } from "react";
import { SafeAreaView } from "react-native";
import { TodosList } from "../../components/TodosList";
import { ThemeContext } from "../../context/ThemeContext";
import { TodoContext } from "../../context/TodoContext";
import { NewTodo } from "../../components/NewTodo";
import { getStyles } from "./styles";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type ShowTodosProps = {
  navigation: NavigationProp<{}>;
};

export const ShowTodos: FC<ShowTodosProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { todos, setTodos } = useContext(TodoContext);

  const styles = getStyles(theme);
  const statusBarTheme = theme === "dark" ? "light" : "dark";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style={statusBarTheme} />

      <NewTodo theme={theme} setTodos={setTodos} />

      <TodosList
        todos={todos}
        theme={theme}
        setTodos={setTodos}
        emptyTodosMessage="Lista está vazia..."
      />
    </SafeAreaView>
  );
};
