import { StyleSheet } from "react-native";
import { ThemesEnum } from "../../../../context/ThemeContext";

import { colorThemes } from "../../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    newTodo: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    newTodo__input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colorTheme.newTodo.inputColor,
      color: colorTheme.newTodo.inputColor,
      paddingHorizontal: 8,
      textAlign: "right",
    },

    newTodo__icon: {
      backgroundColor: colorTheme.newTodo.iconBackground,
      padding: 8,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
  });
}

export default getStyles("light");
