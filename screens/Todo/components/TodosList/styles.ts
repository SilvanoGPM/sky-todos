import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/ThemeContext";

import { colorThemes } from "../../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({

    todos: {
      marginVertical: 16,
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

  });
}

export default getStyles("light");
