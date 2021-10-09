import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import { colorThemes } from "../../colorThemes";
import { getStyles } from "./styles";
import { ThemesEnum } from "../../../../context/ThemeContext";
import Toast from "react-native-root-toast";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type TodoRenderItem = {
  item: TodoType;
  index: number;
};

type TodosListProps = {
  emptyTodosMessage: string;
  todos: TodoType[];
  loading: boolean;
  theme: ThemesEnum;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleSelectedTodo: (todo: TodoType) => () => void;
};

export const TodosList: FC<TodosListProps> = ({
  emptyTodosMessage,
  todos,
  loading,
  setTodos,
  theme,
  handleSelectedTodo,
}) => {
  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function removeTodo(id: string) {
    function exec() {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);

      Toast.show("Todo removido!", {
        duration: Toast.durations.SHORT,
      });
    }

    return () => {
      Alert.alert("Excluir todo", "Tem certeza que deseja excuir esse todo?", [
        { text: "Não" },
        { text: "Sim", onPress: exec },
      ]);
    };
  }

  function switchTodo(id: string) {
    return () => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, finished: !todo.finished } : todo
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
      {loading && <Text style={styles.todos__loading}>Carregando...</Text>}

      {todos.length === 0 && (
        <Text style={styles.todos__loading}>{emptyTodosMessage}</Text>
      )}

      {todos.length > 0 && (
        <FlatList
          data={todos}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
