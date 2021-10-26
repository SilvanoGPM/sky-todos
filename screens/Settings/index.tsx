import React, { FC, useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Share,
} from "react-native";

import { SettingsContext, ThemesEnum } from "../../context/SettingsContext";
import { TodoContext } from "../../context/TodoContext";
import { ThemeSelect } from "./components/ThemeSelect";
import { ExportSelect } from "./components/ExportSelect";

import { getMessageTodoByFormat } from "../../utils/getMessageTodoByFormat";

import { getStyles } from "./styles";
import { colorThemes } from "../../colorTheme";
import { ImportTodos } from "./components/ImportTodos";

export const Settings: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { todos } = useContext(TodoContext);

  const [showFAQ, setShowFAQ] = useState<boolean>(false);
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

          <ImportTodos theme={settings.theme} />
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
