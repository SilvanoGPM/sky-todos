import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: colorTheme.configurations.background,
      height: "100%",
    },

    settings__close: {
      position: "absolute",
      left: 8,
      top: 8,
    },

    settings__switches: {
      marginTop: 16,
      padding: 16,
    },

    settings__switch__wrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    settings__switch__text: {
      fontSize: 25,
      color: colorTheme.configurations.color,
    },

    settings__switch: {
      transform: [{ scale: 1.2 }],
      marginLeft: 10,
    },

    settings__shareContainer: {
      marginTop: 16,
      alignItems: "center",
    },

    settings__shareBtn: {
      marginTop: 16,
      padding: 16,
      backgroundColor: colorTheme.configurations.shareBtnBackground,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
    },

    settings__shareText: {
      color: colorTheme.configurations.shareBtnColor,
      marginLeft: 16,
      fontSize: 30,
    },

    settings__import: {
      marginTop: 8,
    },

    settings__importContainer: {
      borderWidth: 1,
      borderColor: colorTheme.importTodo.color,
      color: colorTheme.importTodo.color,
      flexDirection: "row",
    },

    settings__importText: {
      fontSize: 18,
      color: colorTheme.importTodo.color,
      marginBottom: 8,
    },

    settings__importInput: {
      height: 50,
      color: colorTheme.importTodo.color,
      paddingHorizontal: 8,
      flex: 1,
    },

    settings__importBtn: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },

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
