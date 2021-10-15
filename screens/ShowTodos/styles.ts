import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/ThemeContext";

import { colorThemes } from "../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({

    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colorTheme.backgroundColor,
    },

  });
}

export default getStyles("light");
