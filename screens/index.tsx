import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TodosWrapper } from "./TodosWrapper";
import { UpdateTodo } from "../components/UpdateTodo";
import { SettingsContext } from "../context/SettingsContext";

import { getStyles } from "./styles";
import { colorThemes } from "../colorThemes";

const Stack = createStackNavigator();

export function Screens() {
  const { theme } = useContext(SettingsContext).settings;

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colorTheme.header.textColor,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Wrapper"
        component={TodosWrapper}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UpdateTodo"
        component={UpdateTodo}
        options={{ title: "Atualizar TODO" }}
      />
    </Stack.Navigator>
  );
}
