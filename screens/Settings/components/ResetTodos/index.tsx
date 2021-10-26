import React, { FC, useContext } from "react";
import { Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colorThemes } from "../../../../colorTheme";

import { ThemesEnum } from "../../../../context/SettingsContext";
import { TodoContext } from "../../../../context/TodoContext";

import { getStyles } from "./styles";

type ResetTodosProps = {
  theme: ThemesEnum;
};

export const ResetTodos: FC<ResetTodosProps> = ({ theme }) => {
  const { setTodos } = useContext(TodoContext);

  function resetTodos() {
    function deleteTodos() {
      setTodos([]);
    }

    Alert.alert(
      "Remover TODOs",
      "Deseja remover os TODOs por completo? \n\nAntes de remover os TODOs, é aconselhado fazer um backup.",
      [{ text: "Cancelar" }, { text: "Remover TODOs", onPress: deleteTodos }]
    );
  }

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <TouchableOpacity onPress={resetTodos} style={styles.settings__resetBtn}>
      <Icon
        name="remove"
        size={20}
        color={colorTheme.configurations.resetTodosColor}
      />
    </TouchableOpacity>
  );
};
