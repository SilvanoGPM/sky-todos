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
      fontSize: 25,
      color: colorTheme.configurations.color,
    },

    settings__switch: {
      transform: [{ scale: 1.2 }],
      marginLeft: 10,
    },

    settings__faq: {
      padding: 16,
    },

    settings__faq__title: {
      fontSize: 30,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },

    settings__question: {
      alignItems: 'center',
      borderBottomColor: colorTheme.neutralInverted,
      borderBottomWidth: 1,
      paddingBottom: 20,
    },

    settings__question__text: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 20,
    },
  });
}

export default getStyles("light");
