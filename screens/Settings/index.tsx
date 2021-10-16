import React, { FC, useContext, useEffect, useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext, ThemesEnum } from "../../context/ThemeContext";
import Repository from "../../lib/Repository";
import { colorThemes } from "../colorThemes";
import { getStyles } from "./styles";

type SettingsType = {
  theme: ThemesEnum;
};

const SETTINGS_KEY = "@SkyG0D::settings";

const repository = new Repository();

export const Settings: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<SettingsType>({ theme });
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  useEffect(() => {
    async function persistSettings() {
      await repository.save(SETTINGS_KEY, settings);
    }

    if (!loading) {
      persistSettings();
    }
  }, [settings]);

  useEffect(() => {
    async function loadSettings() {
      const settings = await repository.get(SETTINGS_KEY);

      if (settings) {
        setTheme(settings.theme);
        setSettings(settings);
      }

      setLoading(false);
    }

    loadSettings();
  }, [setTheme]);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function toggleShowFAQ() {
    setShowFAQ(!showFAQ);
  }

  function switchTheme(value: boolean) {
    const theme = value ? "dark" : "light";

    setTheme(theme);
    setSettings({ ...settings, theme });
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.settings__switches}>
          <View style={styles.settings__switch__wrapper}>
            <Text style={styles.settings__switch__text}>Tema escuro?</Text>
            <Switch
              thumbColor={colorTheme.configurations.thumbColor}
              trackColor={colorTheme.configurations.trackColor}
              style={styles.settings__switch}
              value={settings.theme === "dark"}
              onValueChange={switchTheme}
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
