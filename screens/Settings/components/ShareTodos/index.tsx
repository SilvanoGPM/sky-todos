import React, { FC, useContext, useState } from "react";
import { Share, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import { TOAST_VISIBILITY_TIME } from "../../../../globals";

import { TodoContext } from "../../../../context/TodoContext";
import { ThemesEnum } from "../../../../context/SettingsContext";
import { ExportSelect } from "../ExportSelect";
import { ResetTodos } from "../ResetTodos";

import { getMessageTodoByFormat } from "../../../../utils/getMessageTodoByFormat";

import { getStyles } from "./styles";
import { colorThemes } from "../../../../colorTheme";

type ShareTodosProps = {
  theme: ThemesEnum;
};

export const ShareTodos: FC<ShareTodosProps> = ({ theme }) => {
  const [exportFormat, setExportFormat] = useState<"plain" | "json">("plain");

  const { todos } = useContext(TodoContext);

  async function shareExportType() {
    if (todos.length > 0) {
      const message = getMessageTodoByFormat(todos, exportFormat);

      await Share.share({
        message,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Não existem TODOs para compartilhar.",
        visibilityTime: TOAST_VISIBILITY_TIME.short,
        position: "bottom",
      });
    }
  }

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <>
      <ExportSelect
        theme={theme}
        selectedFormat={exportFormat}
        handleChangeValue={setExportFormat}
      />

      <View style={styles.settings__actionsContainer}>
        <TouchableOpacity
          onPress={shareExportType}
          style={styles.settings__shareBtn}
        >
          <Icon
            name="share"
            size={20}
            color={colorTheme.configurations.shareBtnColor}
          />
        </TouchableOpacity>

        <ResetTodos theme={theme} />
      </View>
    </>
  );
};
