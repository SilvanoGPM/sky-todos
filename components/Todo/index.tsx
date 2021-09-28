import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import Repository from "../../lib/Repository";

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
const TODOS_KEY = "@SkyG0D::todos";

const repository = new Repository();

export function Todo() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<TodoType>({} as TodoType);
  const [todoToUpdate, setTodoToUpdate] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
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
      setTodoToUpdate(todo.title);
      setShowModal(true);
    };
  }

  function validateTodoTitle(todoTitle: string) {
    const clearedTodoTitle = todoTitle.trim();

    if (clearedTodoTitle.length > MAX_CHARS_TODO) {
      const message = `O máximo de caracteres para um a fazer é ${MAX_CHARS_TODO}.`;

      Toast.show(message, {
        duration: Toast.durations.SHORT,
      });

      return null;
    }

    const isTodoTitleValid = clearedTodoTitle && clearedTodoTitle.length >= 3;

    if (!isTodoTitleValid) {
      Toast.show("A fazer precisa ter pelo menos 3 caracteres...", {
        duration: Toast.durations.SHORT,
      });

      return null;
    }

    return clearedTodoTitle;
  }

  function insertTodo() {
    const validTodo = validateTodoTitle(todoTitle);

    if (validTodo) {
      const newTodo = {
        id: uuid(),
        title: validTodo,
        finished: false,
      };

      setTodos([newTodo, ...todos]);
      setTodoTitle("");
    }
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

  function closeModal() {
    setShowModal(false);
  }

  function updateTodo() {
    const validTodo = validateTodoTitle(todoToUpdate);

    if (validTodo) {
      const newTodos = todos.map((todo) =>
        todo.id === selectedTodo.id ? { ...todo, title: validTodo } : todo
      );

      setTodos(newTodos);
      closeModal();

      Toast.show("A fazer foi atualizado!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }
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

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={closeModal} style={styles.modal__close}>
            <Icon name="close" size={30} color={colorThemes.light.modalClose} />
          </TouchableOpacity>

          <Text style={styles.modal__id}>Id: {selectedTodo.id}</Text>

          <View style={styles.modal__title__container}>
            <Text style={styles.modal__title}>Título:</Text>
            <TextInput
              style={styles.modal__title__input}
              value={todoToUpdate}
              onChangeText={setTodoToUpdate}
            />
            <Text style={styles.modal__title__msg}>
              Caso você altere o valor do título, e clique em salvar, o valor
              será atualizado.
            </Text>
          </View>

          <Text style={styles.modal__finished}>
            A fazer {selectedTodo.finished ? "" : "não "}foi finalizado!
          </Text>

          <View style={styles.modal__save__container}>
            <TouchableOpacity style={styles.modal__save} onPress={updateTodo}>
              <Text style={styles.modal__save__text}>Salvar</Text>
              <Icon name="save" size={20} color={colorThemes.light.neutral} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    </SafeAreaView>
  );
}
