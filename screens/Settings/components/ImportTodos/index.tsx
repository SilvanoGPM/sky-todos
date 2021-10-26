import React, { useState, FC, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";

import { TOAST_VISIBILITY_TIME } from "../../../../globals";

import { TodoContext } from "../../../../context/TodoContext";
import { ThemesEnum } from "../../../../context/SettingsContext";
import { TodoType } from "../../../../types/types";

import { getStyles } from "./styles";
import { colorThemes } from "../../../../colorTheme";

type ImportTodosProps = {
  theme: ThemesEnum;
};

export const ImportTodos: FC<ImportTodosProps> = ({ theme }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const [importTODOsText, setImportTODOsText] = useState<string>("");

  function verifyAllTODOsToImport(todosToImport: TodoType[]) {
    const keys = ["id", "title", "finished"];

    return keys.every((key) =>
      todosToImport.every((todo) => Object.keys(todo).includes(key))
    );
  }

  function handleImportTODOs() {
    try {
      const todosToImport: TodoType[] = JSON.parse(importTODOsText.trim());
      const canContinue = verifyAllTODOsToImport(todosToImport);

      if (!canContinue) {
        Toast.show({
          type: "error",
          text1: "Houve um erro",
          text2: "Algum TODO está faltando uma chave obrigatória.",
          visibilityTime: TOAST_VISIBILITY_TIME.medium,
          position: "bottom",
        });

        return;
      }

      const newTodosToImport = todosToImport.map((todo) => ({
        ...todo,
        id: uuid(),
      }));

      Toast.show({
        type: "success",
        text1: "Concluído com êxito",
        text2: "TODOs foram importados para a sua lista.",
        visibilityTime: TOAST_VISIBILITY_TIME.medium,
        position: "bottom",
      });

      setImportTODOsText("");
      setTodos([...newTodosToImport, ...todos]);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Houve um erro",
        text2: "Texto informado não é uma lista de TODOs em JSON válida.",
        visibilityTime: TOAST_VISIBILITY_TIME.medium,
        position: "bottom",
      });

      console.log(err);
    }
  }

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <View style={styles.settings__import}>
      <Text style={styles.settings__importText}>Imporar TODOs:</Text>

      <View style={styles.settings__importContainer}>
        <TextInput
          style={styles.settings__importInput}
          placeholderTextColor={colorTheme.importTodo.color}
          value={importTODOsText}
          onChangeText={setImportTODOsText}
          placeholder="Cole aqui os TODOs"
        />

        <TouchableOpacity
          onPress={handleImportTODOs}
          style={styles.settings__importBtn}
        >
          <Icon name="check" size={30} color={colorTheme.importTodo.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
