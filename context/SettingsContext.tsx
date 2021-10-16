import React, { createContext, FC, useState, useEffect } from "react";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { ActivityIndicator, Appearance, StyleSheet, View } from "react-native";

import Repository from "../lib/Repository";

import { colorThemes } from "../colorThemes";

export type ThemesEnum = "light" | "dark" | "dracula";

type SettingsType = {
  theme: ThemesEnum;
};

type SettingsContextProps = {
  children: React.ReactNode;
};

type ContextType = {
  settings: {
    theme: ThemesEnum;
  };
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
};

const INITIAL_VALUE: ContextType = {
  settings: {
    theme: Appearance.getColorScheme() || "light",
  },
  setSettings: () => {},
};

const SETTINGS_KEY = "@SkyG0D::settings";

const repository = new Repository();

export const SettingsContext = createContext<ContextType>(INITIAL_VALUE);

export const SettingsProvider: FC<SettingsContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<SettingsType>({
    theme: "light",
  });

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
      const settings = await repository.get<SettingsType>(SETTINGS_KEY);

      if (settings) {
        setSettings(settings);
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  const colorTheme = colorThemes[settings.theme];

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colorTheme.backgroundColor },
        ]}
      >
        <ActivityIndicator color={colorTheme.neutralInverted} size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={colorTheme.statusBar as StatusBarStyle} />

      <SettingsContext.Provider
        value={{
          settings,
          setSettings,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
