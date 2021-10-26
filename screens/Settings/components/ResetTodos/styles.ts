import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { colorThemes } from "../../../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    settings__reset: {
      alignItems: "center",
    },

    settings__resetBtn: {
      backgroundColor: colorTheme.configurations.resetTodosBackground,
      marginTop: 16,
      padding: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
    },
  });
}

export default getStyles("light");
