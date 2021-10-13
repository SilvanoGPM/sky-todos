import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/ThemeContext";

import { colorThemes } from "../../../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    header: {
      padding: 20,
      alignItems: "center",
    },

    text: {
      fontSize: 30,
      textAlign: "center",
      color: colorTheme.header.textColor,
      borderBottomWidth: 1,
      borderBottomColor: colorTheme.header.textColor,
      paddingHorizontal: 20,
    },
  });
}

export default getStyles("light");
