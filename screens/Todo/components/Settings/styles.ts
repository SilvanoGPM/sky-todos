import { StyleSheet } from "react-native";
import { ThemesEnum } from "../../../../context/ThemeContext";

import { colorThemes } from "../../colorThemes";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: colorTheme.configurations.background,
      height: '100%',
    },

    settings__close: {
      position: 'absolute',
      left: 8,
      top: 8,
    },

    settings__switches: {
      marginTop: 16,
      padding: 16,
    },

    settings__switch__wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    settings__switch__text: {
      fontSize: 30,
      color: colorTheme.configurations.color,
    },

    settings__switch: {
      transform: [{ scale: 1.2 }],
      marginLeft: 10,
    },
  });
}

export default getStyles("light");
