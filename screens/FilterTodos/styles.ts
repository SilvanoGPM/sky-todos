import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../context/SettingsContext";

import { colorThemes } from "../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colorTheme.backgroundColor,
    },

    filter: {
      flexDirection: "row",
      height: 50,
    },

    filter__input: {
      borderColor: colorTheme.filter.inputColor,
      color: colorTheme.filter.inputColor,
      borderWidth: 1,
      padding: 8,
      flex: 1,
      textAlign: "right",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },

    filter__send: {
      padding: 8,
      backgroundColor: colorTheme.filter.inputColor,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      width: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    filter__close: {
      marginTop: 20,
      marginLeft: -10,
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    filter__search__text: {
      fontSize: 20,
      color: colorTheme.filter.searchColor,
    },

    filter__results: {
      fontSize: 14,
      color: colorTheme.filter.searchColor,
    },
  });
}

export default getStyles("light");
