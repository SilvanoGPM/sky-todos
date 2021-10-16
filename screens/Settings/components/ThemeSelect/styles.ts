import { StyleSheet } from "react-native";
import { ThemesEnum } from "../../../../context/SettingsContext";
import { colorThemes } from "../../../../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      width: "100%",
      height: 50,
      borderColor: colorTheme.themeSelect.color,
      borderWidth: 1,
    },

    themeSelect: {
      flex: 1,
      color: colorTheme.themeSelect.color,
    },

    item: {
      color: "red",
      backgroundColor: colorTheme.themeSelect.color,
    },
  });
}

export default getStyles("light");
