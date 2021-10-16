import React, { FC } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { getStyles } from "./styles";
import { colorThemes } from "../../../../colorTheme";

type ExportTypeEnum = "plain"|"json";

type ExportSelectProps = {
  selectedFormat: ExportTypeEnum;
  theme: ThemesEnum;
  handleChangeValue: (value: ExportTypeEnum) => void;
};

export const ExportSelect: FC<ExportSelectProps> = ({
  theme,
  selectedFormat,
  handleChangeValue,
}) => {
  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <View style={styles.container}>
      <Picker
        style={styles.exportSelect}
        dropdownIconColor={colorTheme.themeSelect.color}
        selectedValue={selectedFormat}
        onValueChange={handleChangeValue}
      >
        <Picker.Item label="Texto" value="plain" />
        <Picker.Item label="JSON" value="json" />
      </Picker>
    </View>
  );
};
