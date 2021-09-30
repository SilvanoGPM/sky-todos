import React, { FC, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import Icon from "react-native-vector-icons/FontAwesome";

import { View, Modal, TouchableOpacity, Text, TextInput } from "react-native";

import { validateTodoTitle } from "../../../../utils/validateTodoTitle";

import { colorThemes } from "../../colorThemes";
import styles from "./styles";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type UpdateTodoProps = {
  selectedTodo: TodoType;
  todos: TodoType[];
  setSelectedTodo: (todo: TodoType) => void;
  setTodos: (todos: TodoType[]) => void;
};

export const UpdateTodo: FC<UpdateTodoProps> = ({
  selectedTodo,
  todos,
  setSelectedTodo,
  setTodos,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoToUpdate, setTodoToUpdate] = useState<string>("");

  useEffect(() => {
    if (selectedTodo.id) {
      setTodoToUpdate(selectedTodo.title);
      setShowModal(true);
    }
  }, [selectedTodo]);

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

  function closeModal() {
    setSelectedTodo({} as TodoType);
    setShowModal(false);
  }

  return (
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
            Caso você altere o valor do título, e clique em salvar, o valor será
            atualizado.
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
  );
};
