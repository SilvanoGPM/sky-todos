import React, { FC, useContext } from "react";

import { ScrollView, View } from "react-native";

import { SettingsContext, ThemesEnum } from "../../context/SettingsContext";
import { ThemeSelect } from "./components/ThemeSelect";
import { ImportTodos } from "./components/ImportTodos";
import { Faq } from "./components/Faq";

import { getStyles } from "./styles";
import { ShareTodos } from "./components/ShareTodos";

export const Settings: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const styles = getStyles(settings.theme);

  function switchTheme(value: ThemesEnum) {
    setSettings({ ...settings, theme: value });
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.settings__options}>
          <View style={styles.settings__option__wrapper}>
            <ThemeSelect
              theme={settings.theme}
              handleChangeValue={switchTheme}
            />
          </View>

          <ImportTodos theme={settings.theme} />

          <ShareTodos theme={settings.theme} />

        </View>

        <Faq theme={settings.theme} />
      </ScrollView>
    </View>
  );
};
