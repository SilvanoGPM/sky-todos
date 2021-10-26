import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { colorThemes } from "../../../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    settings__import: {
      marginTop: 8,
    },

    settings__importContainer: {
      borderWidth: 1,
      borderColor: colorTheme.importTodo.color,
      color: colorTheme.importTodo.color,
      flexDirection: "row",
    },

    settings__importText: {
      fontSize: 18,
      color: colorTheme.importTodo.color,
      marginBottom: 8,
    },

    settings__importInput: {
      height: 50,
      color: colorTheme.importTodo.color,
      paddingHorizontal: 8,
      flex: 1,
    },

    settings__importBtn: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default getStyles("light");
