import React, { FC, useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../../context/ThemeContext";
import { TodoContext } from "../../context/TodoContext";
import { colorThemes } from "../../screens/colorThemes";
import { TodoListRouteStackParamList } from "../../types/NavigationTypes";
import { validateTodoTitle } from "../../utils/validateTodoTitle";
import { getStyles } from "./styles";

const TOAST_VISIBILITY_TIME = 1000;

export const UpdateTodo: FC<TodoListRouteStackParamList<"UpdateTodo">> = ({
  navigation,
  route,
}) => {
  const { theme } = useContext(ThemeContext);
  const { todos, setTodos } = useContext(TodoContext);

  const [todoToUpdate, setTodoToUpdate] = useState<string>("");

  const { selectedTodo } = route.params;

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  useEffect(() => {
    if (selectedTodo.id) {
      setTodoToUpdate(selectedTodo.title);
    }
  }, [selectedTodo]);

  function updateTodo() {
    const validTodo = validateTodoTitle(todoToUpdate);

    if (validTodo) {
      const newTodos = todos.map((todo) =>
        todo.id === selectedTodo.id ? { ...todo, title: validTodo } : todo
      );

      setTodos(newTodos);

      Toast.show({
        type: "success",
        text1: "TODO foi atualizado!",
        visibilityTime: TOAST_VISIBILITY_TIME,
        position: "bottom",
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.modal}>
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
  );
};
