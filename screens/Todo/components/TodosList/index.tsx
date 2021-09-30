import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";

import { colorThemes } from "../../colorThemes";
import styles from "./styles";

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
  todos: TodoType[];
  loading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleSelectedTodo: (todo: TodoType) => () => void;
};

export const TodosList: FC<TodosListProps> = ({
  todos,
  loading,
  setTodos,
  handleSelectedTodo,
}) => {
  function removeTodo(id: string) {
    function exec() {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
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

    const itemStyles = [
      styles.list__item,
      finished
        ? {
            borderBottomColor: colorThemes.light.todoFinished,
            opacity: 0.5,
          }
        : {},
    ];

    return (
      <TouchableOpacity onPress={handleSelectedTodo(item)}>
        <View style={itemStyles}>
          <Text
            style={[
              styles.list__text,
              finished
                ? {
                    color: colorThemes.light.todoFinished,
                    textDecorationLine: "line-through",
                  }
                : {},
            ]}
          >
            {title}
          </Text>

          <View style={styles.list__actions}>
            <TouchableOpacity onPress={removeTodo(id)}>
              <Icon
                name="trash-o"
                size={30}
                color={colorThemes.light.todoRemove}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={switchTodo(id)}>
              <Icon
                name={finished ? "remove" : "check"}
                size={30}
                color={
                  finished
                    ? colorThemes.light.todoSwitch.on
                    : colorThemes.light.todoSwitch.off
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

      {!loading && todos.length === 0 && (
        <Text style={styles.todos__empty}>Lista está vazia...</Text>
      )}

      <FlatList
        data={todos}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </View>
  );
};
