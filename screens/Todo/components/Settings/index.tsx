import React, { FC, useContext, useEffect, useState } from "react";
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { ThemeContext, ThemesEnum } from "../../../../context/ThemeContext";
import Repository from "../../../../lib/Repository";

import { colorThemes } from "../../colorThemes";
import { getStyles } from "./styles";

type SettingsType = {
  theme: ThemesEnum;
};

const SETTINGS_KEY = "@SkyG0D::settings";

const repository = new Repository();

export const Settings: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<SettingsType>({ theme });

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
  }, []);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function openSettings() {
    setShowSettings(true);
  }

  function closeSettings() {
    setShowSettings(false);
  }

  function switchTheme(value: boolean) {
    const theme = value ? "dark" : "light";

    setTheme(theme);
    setSettings({ ...settings, theme });
  }

  return (
    <View>
      <TouchableOpacity onPress={openSettings}>
        <Icon
          name="gear"
          size={30}
          color={colorTheme.configurations.iconColor}
        />
      </TouchableOpacity>

      <Modal visible={showSettings} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.settings__close}
            onPress={closeSettings}
          >
            <Icon
              name="close"
              size={30}
              color={colorTheme.configurations.closeIcon}
            />
          </TouchableOpacity>

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
        </View>
      </Modal>
    </View>
  );
};