import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colorTheme.modal.container,
    },

    modal: {
      width: "90%",
      backgroundColor: colorTheme.modal.backgroundColor,
      margin: 20,
      padding: 20,
      elevation: 20,
    },

    modal__out: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    modal__close: {
      position: "absolute",
      right: 8,
      top: 4,
    },

    modal__id: {
      marginTop: 20,
      fontSize: 20,
      color: colorTheme.modal.textColor,
    },

    modal__title__container: {
      marginTop: 20,
    },

    modal__title: {
      fontSize: 20,
      color: colorTheme.modal.textColor,
    },

    modal__title__input: {
      borderWidth: 1,
      padding: 8,
      fontSize: 20,
      color: colorTheme.modal.textColor,
      borderColor: colorTheme.modal.textColor,
    },

    modal__title__warn: {
      fontSize: 10,
      color: colorTheme.modal.warnColor,
    },

    modal__finished: {
      marginTop: 20,
      fontSize: 20,
      color: colorTheme.modal.textColor,
    },

    modal__save__container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },

    modal__save: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorTheme.modal.saveBackgroundColor,
      padding: 8,
    },

    modal__save__text: {
      marginRight: 4,
      fontSize: 20,
      color: colorTheme.modal.saveColor,
      textTransform: "uppercase",
    },
  });
}

export default getStyles("light");
