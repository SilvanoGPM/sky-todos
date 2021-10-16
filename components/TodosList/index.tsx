import React, { FC } from "react";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { TOAST_VISIBILITY_TIME } from "../../globals";

import { TodoType } from "../../types/types";
import { ThemesEnum } from "../../context/SettingsContext";
import { TodoListRouteParamList } from "../../types/navigation-types";

import { colorThemes } from "../../colorTheme";
import { getStyles } from "./styles";

type TodoRenderItem = {
  item: TodoType;
  index: number;
};

type TodosListProps = {
  emptyTodosMessage: string;
  todos: TodoType[];
  theme: ThemesEnum;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

type TodoListNavigationProp = StackNavigationProp<
  TodoListRouteParamList,
  "UpdateTodo"
>;

export const TodosList: FC<TodosListProps> = ({
  emptyTodosMessage,
  todos,
  theme,
  setTodos,
}) => {
  const navigation = useNavigation<TodoListNavigationProp>();

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function handleSelectedTodo(todo: TodoType) {
    return () => {
      navigation.navigate("UpdateTodo", {
        selectedTodo: todo,
      });
    };
  }

  function removeTodo(id: string) {
    function exec() {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);

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

  function switchTodo(id: string) {
    return () => {
      const newTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, finished: !todo.finished, finishedDate: Date.now() }
          : todo
      );

      setTodos(newTodos);
    };
  }

  function renderItem({ item }: TodoRenderItem) {
    const { id, title, finished } = item;

    return (
      <TouchableOpacity onPress={handleSelectedTodo(item)}>
        <View style={[styles.list__item, finished && styles.todo__finished]}>
          <Text
            style={[styles.list__text, finished && styles.todo__finished__text]}
          >
            {title}
          </Text>

          <View style={styles.list__actions}>
            <TouchableOpacity onPress={removeTodo(id)}>
              <Icon
                name="trash-o"
                size={30}
                color={colorTheme.todo.removeColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={switchTodo(id)}>
              <Icon
                name={finished ? "remove" : "check"}
                size={30}
                color={
                  finished
                    ? colorTheme.todo.switchColor.on
                    : colorTheme.todo.switchColor.off
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.todos}>
      {todos.length === 0 && (
        <Text style={styles.todos__loading}>{emptyTodosMessage}</Text>
      )}

      {todos.length > 0 && (
        <FlatList
          data={todos}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          contentContainerStyle={{ overflow: "scroll" }}
        />
      )}
    </View>
  );
};
