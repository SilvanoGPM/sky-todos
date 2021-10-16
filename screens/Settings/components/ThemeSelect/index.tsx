import React, { FC } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { getStyles } from "./styles";
import { colorThemes } from "../../../../colorTheme";

type ThemeSelectProps = {
  theme: ThemesEnum;
  handleChangeValue: (value: ThemesEnum) => void;
};

export const ThemeSelect: FC<ThemeSelectProps> = ({
  theme,
  handleChangeValue,
}) => {
  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <View style={styles.container}>
      <Picker
        itemStyle={styles.item}
        dropdownIconColor={colorTheme.themeSelect.color}
        style={styles.themeSelect}
        selectedValue={theme}
        onValueChange={handleChangeValue}
      >
        <Picker.Item label="Claro" value="light" />
        <Picker.Item label="Escuro" value="dark" />
        <Picker.Item label="Dracula" value="dracula" />
      </Picker>
    </View>
  );
};
