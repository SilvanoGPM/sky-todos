import React, { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import styles, { colorThemes } from "./styles";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type TodoRenderItem = {
  item: TodoType;
  index: number;
};

const MAX_CHARS_TODO = 200;

const todos1 = [
  { id: "1", title: "Arrumar casa", finished: false },
  { id: "2", title: "Comprar carne", finished: true },
  { id: "3", title: "Fazer atividades de físicaaaaa", finished: false },
];

export function Todo() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(todos1);

  function insertTodo() {
    const clearedTodoTitle = todoTitle.trim();

    if (clearedTodoTitle.length > MAX_CHARS_TODO) {
      Toast.show(`O máximo de caracteres para um a fazer é ${MAX_CHARS_TODO}.`, {
        duration: Toast.durations.SHORT
      });

      return;
    }

    const isTodoTitleValid = clearedTodoTitle && clearedTodoTitle.length >= 3;

    if (isTodoTitleValid) {
      const newTodo = {
        id: uuid(),
        title: clearedTodoTitle,
        finished: false,
      };

      setTodos([newTodo, ...todos]);
      setTodoTitle("");
      return;
    }

    Toast.show('A fazer precisa ter pelo menos 3 caracteres...', {
      duration: Toast.durations.SHORT
    });

  }

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
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newTodo}>
        <TextInput
          style={styles.newTodo__input}
          placeholder="Título do a fazer"
          placeholderTextColor={colorThemes.light.newTodo}
          value={todoTitle}
          onChangeText={setTodoTitle}
        />

        <TouchableOpacity onPress={insertTodo} style={styles.newTodo__icon}>
          <Icon name="plus" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.todos}>
        {todos.length === 0 && (
          <Text style={styles.todos__empty}>Você não possui a fazeres...</Text>
        )}

        <FlatList
          data={todos}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
