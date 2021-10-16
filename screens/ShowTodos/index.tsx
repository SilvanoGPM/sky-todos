import "react-native-get-random-values";

import { NavigationProp } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { FC, useContext } from "react";
import { SafeAreaView } from "react-native";
import { TodosList } from "../../components/TodosList";
import { SettingsContext } from "../../context/SettingsContext";
import { TodoContext } from "../../context/TodoContext";
import { NewTodo } from "../../components/NewTodo";
import { getStyles } from "./styles";
import { TodoType } from "../../types/types";

type ShowTodosProps = {
  navigation: NavigationProp<{}>;
};

export const ShowTodos: FC<ShowTodosProps> = () => {
  const { theme } = useContext(SettingsContext).settings;
  const { todos, setTodos } = useContext(TodoContext);

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
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
