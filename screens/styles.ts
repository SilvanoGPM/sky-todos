import { StyleSheet } from "react-native";

import { ThemesEnum } from "../context/ThemeContext";

import { colorThemes } from "./colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    header: {
      backgroundColor: colorTheme.header.background,
      shadowColor: 'white',
    },

    tabs: {
      backgroundColor: colorTheme.tabBar.background,
    },
  });
}

export default getStyles("light");
