import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { colorThemes } from "../../../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({

    settings__center: {
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colorTheme.configurations.color,
      alignItems: "center",
      width: "100%",
    },

    settings__showFAQ: {
      paddingVertical: 8,
      paddingHorizontal: 32,
      backgroundColor: colorTheme.configurations.showFAQ,
    },

    settings__showFAQ__text: {
      color: colorTheme.configurations.showFAQColor,
    },

    settings__faq: {
      paddingHorizontal: 16,
      marginTop: 4,
    },

    settings__faq__title: {
      fontSize: 30,
      textAlign: "center",
      textDecorationLine: "underline",
      color: colorTheme.neutralInverted,
    },

    settings__question: {
      alignItems: "center",
      borderBottomColor: colorTheme.neutralInverted,
      borderBottomWidth: 1,
      paddingBottom: 20,
    },

    settings__question__text: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 20,
      color: colorTheme.neutralInverted,
    },
  });
}

export default getStyles("light");
