import React, { FC, useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import { ThemesEnum } from "../../../../context/ThemeContext";

import { validateTodoTitle } from "../../../../utils/validateTodoTitle";

import { colorThemes } from "../../../colorThemes";
import { getStyles } from "./styles";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type UpdateTodoProps = {
  selectedTodo: TodoType;
  todos: TodoType[];
  theme: ThemesEnum;
  setSelectedTodo: (todo: TodoType) => void;
  setTodos: (todos: TodoType[]) => void;
};

const TOAST_VISIBILITY_TIME = 1000;

export const UpdateTodo: FC<UpdateTodoProps> = ({
  selectedTodo,
  todos,
  theme,
  setSelectedTodo,
  setTodos,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoToUpdate, setTodoToUpdate] = useState<string>("");

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

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

      Toast.show({
        type: "success",
        text1: "TODO foi atualizado!",
        visibilityTime: TOAST_VISIBILITY_TIME,
        position: "bottom",
      });
    }
  }

  function closeModal() {
    setSelectedTodo({} as TodoType);
    setShowModal(false);
  }

  return (
    <Modal
      onRequestClose={closeModal}
      transparent
      animationType="slide"
      visible={showModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modal__out} />
      </TouchableWithoutFeedback>

      <View style={styles.modal}>
        <TouchableOpacity onPress={closeModal} style={styles.modal__close}>
          <Icon name="close" size={30} color={colorTheme.modal.closeColor} />
        </TouchableOpacity>

        <Text style={styles.modal__id}>Id: {selectedTodo.id}</Text>

        <View style={styles.modal__title__container}>
          <Text style={styles.modal__title}>Título:</Text>
          <TextInput
            style={styles.modal__title__input}
            value={todoToUpdate}
            onChangeText={setTodoToUpdate}
          />
          <Text style={styles.modal__title__warn}>
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
            <Icon name="save" size={20} color={colorTheme.modal.saveColor} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
