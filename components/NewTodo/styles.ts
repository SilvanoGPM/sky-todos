import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../screens/colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    newTodo: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 50,
    },

    newTodo__input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colorTheme.newTodo.inputColor,
      color: colorTheme.newTodo.inputColor,
      paddingHorizontal: 8,
      textAlign: "right",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },

    newTodo__icon: {
      backgroundColor: colorTheme.newTodo.inputColor,
      padding: 8,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      width: 40,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

export default getStyles("light");
