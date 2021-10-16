import "react-native-get-random-values";

import React, { FC, useContext } from "react";
import { NavigationProp } from "@react-navigation/core";
import { SafeAreaView } from "react-native";

import { TodoContext } from "../../context/TodoContext";
import { SettingsContext } from "../../context/SettingsContext";
import { TodosList } from "../../components/TodosList";
import { NewTodo } from "../../components/NewTodo";

import { getStyles } from "./styles";

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
