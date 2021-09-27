import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type TodoRenderItem = {
  item: TodoType;
  index: number;
};

const todos1 = [
  { id: "1", title: "Arrumar casa", finished: false },
  { id: "2", title: "Comprar carne", finished: true },
  { id: "3", title: "Fazer atividades de física", finished: false },
];

export function Todo() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(todos1);

  function insertTodo() {
    const clearedTodoTitle = todoTitle.trim();

    const isTodoTitleValid = clearedTodoTitle && clearedTodoTitle.length >= 3;

    if (isTodoTitleValid) {
      const newTodo = {
        id: uuid(),
        title: clearedTodoTitle,
        finished: false,
      };

      setTodos([newTodo, ...todos]);
      setTodoTitle("");
    }
  }

  function removeTodo(id: string) {
    return () => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
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
      <View>
        <Text style={{ color: finished ? "red" : "black" }}>{title}</Text>
        <TouchableOpacity onPress={removeTodo(id)}>
          <Icon name="trash-o" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchTodo(id)}>
          {finished ? (
            <Icon name="remove" size={30} />
          ) : (
            <Icon name="check" size={30} />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <TextInput value={todoTitle} onChangeText={setTodoTitle} />
        <TouchableOpacity onPress={insertTodo}>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
