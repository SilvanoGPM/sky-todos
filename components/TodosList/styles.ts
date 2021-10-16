import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../screens/colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    todos: {
      marginVertical: 16,
      paddingBottom: 16,
    },

    todos__empty: {
      fontSize: 30,
      color: colorTheme.todo.emptyColor,
      textAlign: "center",
    },

    todos__loading: {
      fontSize: 30,
      color: colorTheme.todo.loadingColor,
      textAlign: "center",
    },

    list__item: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 16,
      borderBottomColor: colorTheme.todo.textColor,
      borderBottomWidth: 1,
      opacity: 1,
    },

    list__text: {
      flex: 1,
      color: colorTheme.todo.textColor,
      fontSize: 20,
      textDecorationLine: "none",
      marginRight: 10,
    },

    list__actions: {
      width: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    todo__finished: {
      borderBottomColor: colorTheme.todo.finishedColor,
      opacity: 0.5,
    },

    todo__finished__text: {
      color: colorTheme.todo.finishedColor,
      textDecorationLine: "line-through",
    },
  });
}

export default getStyles("light");
