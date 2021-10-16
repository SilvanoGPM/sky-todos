import React, { FC, useContext, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";

import { SettingsContext, ThemesEnum } from "../../context/SettingsContext";
import { ThemeSelect } from "./components/ThemeSelect";

import { getStyles } from "./styles";
import { colorThemes } from "../../colorTheme";

export const Settings: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  const styles = getStyles(settings.theme);
  const colorTheme = colorThemes[settings.theme];

  function toggleShowFAQ() {
    setShowFAQ(!showFAQ);
  }

  function switchTheme(value: ThemesEnum) {
    setSettings({ ...settings, theme: value });
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
