import React, { FC, useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Share,
  TextInput,
} from "react-native";

import { TOAST_VISIBILITY_TIME } from "../../globals";

import { SettingsContext, ThemesEnum } from "../../context/SettingsContext";
import { TodoContext } from "../../context/TodoContext";
import { ThemeSelect } from "./components/ThemeSelect";
import { ExportSelect } from "./components/ExportSelect";

import { getMessageTodoByFormat } from "../../utils/getMessageTodoByFormat";

import { getStyles } from "./styles";
import { colorThemes } from "../../colorTheme";
import { TodoType } from "../../types/types";

export const Settings: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { todos, setTodos } = useContext(TodoContext);

  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [importTODOsText, setImportTODOsText] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"plain" | "json">("plain");

  const styles = getStyles(settings.theme);
  const colorTheme = colorThemes[settings.theme];

  function toggleShowFAQ() {
    setShowFAQ(!showFAQ);
  }

  function switchTheme(value: ThemesEnum) {
    setSettings({ ...settings, theme: value });
  }

  async function shareExportType() {
    const message = getMessageTodoByFormat(todos, exportFormat);

    await Share.share({
      message,
    });
  }

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

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.settings__switches}>
          <View style={styles.settings__switch__wrapper}>
            <ThemeSelect
              theme={settings.theme}
              handleChangeValue={switchTheme}
            />
          </View>

          <View style={styles.settings__shareContainer}>
            <ExportSelect
              theme={settings.theme}
              selectedFormat={exportFormat}
              handleChangeValue={setExportFormat}
            />

            <TouchableOpacity
              onPress={shareExportType}
              style={styles.settings__shareBtn}
            >
              <Icon
                name="share"
                size={20}
                color={colorTheme.configurations.shareBtnColor}
              />
            </TouchableOpacity>
          </View>

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
                <Icon
                  name="check"
                  size={30}
                  color={colorTheme.importTodo.color}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.settings__center}>
          <TouchableOpacity
            onPress={toggleShowFAQ}
            style={styles.settings__showFAQ}
          >
            <Text style={styles.settings__showFAQ__text}>
              {showFAQ ? "Esconder" : "Mostrar"} FAQ
            </Text>
          </TouchableOpacity>
        </View>

        {showFAQ && (
          <View style={styles.settings__faq}>
            <Text style={styles.settings__faq__title}>
              Perguntas Frequentes
            </Text>

            <View style={styles.settings__question}>
              <Text style={styles.settings__question__text}>
                O que é um TODO?
              </Text>
              <Text style={styles.settings__question__text}>
                Um TODO é uma tarefa, que você deve realizar, um "a fazer".
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
