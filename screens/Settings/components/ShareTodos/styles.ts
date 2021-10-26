import { StyleSheet } from "react-native";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { colorThemes } from "../../../../colorTheme";

export function getStyles(theme: ThemesEnum) {
  const colorTheme = colorThemes[theme];

  return StyleSheet.create({
    settings__actionsContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },

    settings__shareBtn: {
      marginTop: 16,
      marginRight: 16,
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
  });
}

export default getStyles("light");
