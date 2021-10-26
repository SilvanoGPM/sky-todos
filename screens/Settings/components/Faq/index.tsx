import React, { FC, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { ThemesEnum } from "../../../../context/SettingsContext";

import { getStyles } from "./styles";

type FaqProps = {
  theme: ThemesEnum;
};

export const Faq: FC<FaqProps> = ({ theme }) => {
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  const styles = getStyles(theme);

  function toggleShowFAQ() {
    setShowFAQ(!showFAQ);
  }

  return (
    <>
      <View style={styles.settings__center}>
        <TouchableOpacity
          onPress={toggleShowFAQ}
          style={styles.settings__showFAQ}
        >
          <Text style={styles.settings__showFAQ__text}>
            {showFAQ ? "Esconder" : "Mostrar"} FAQ
          </Text>
        </TouchableOpacity>
      </View>

      {showFAQ && (
        <View style={styles.settings__faq}>
          <Text style={styles.settings__faq__title}>Perguntas Frequentes</Text>

          <View style={styles.settings__question}>
            <Text style={styles.settings__question__text}>
              O que é um TODO?
            </Text>
            <Text style={styles.settings__question__text}>
              Um TODO é uma tarefa, que você deve realizar, um "a fazer".
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
