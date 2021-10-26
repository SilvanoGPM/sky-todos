import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: colorTheme.configurations.background,
      height: "100%",
    },

    settings__options: {
      marginTop: 16,
      padding: 16,
    },

    settings__option__wrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    settings__option__text: {
      fontSize: 25,
      color: colorTheme.configurations.color,
    },
  });
}

export default getStyles("light");
