import React, { FC } from "react";
import { Text, View } from "react-native";

import { ThemesEnum } from "../../../../context/ThemeContext";

import { getStyles } from "./styles";

type HeaderProps = {
  theme: ThemesEnum;
};

export const Header: FC<HeaderProps> = ({ theme }) => {
  const styles = getStyles(theme);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>Lista de TODOs</Text>
    </View>
  );
};
