import React, { FC, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ShowTodos } from "../ShowTodos";
import { Settings } from "../Settings";
import { FilterTodos } from "../FilterTodos";
import { Text } from "react-native";

import { getStyles } from "../styles";
import { colorThemes } from "../colorThemes";
import { ThemeContext } from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

export function TodosWrapper() {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  return (
    <>
      <Tab.Navigator
        initialRouteName="TodosList"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: colorTheme.header.textColor,
          headerTitleAlign: "center",
          tabBarStyle: styles.tabs,
          tabBarActiveTintColor: colorTheme.tabBar.activeColor,
          tabBarInactiveTintColor: colorTheme.tabBar.color,
        }}
      >
        <Tab.Screen
          name="TodosList"
          component={ShowTodos}
          options={{
            title: "SkyTODOs",
            tabBarLabel: "TODOs",
            tabBarIcon: (props) => <Icon5 name="tasks" {...props} />,
          }}
        />

        <Tab.Screen
          name="FilterTodos"
          component={FilterTodos}
          options={{
            title: "Filtrar TODOs",
            tabBarLabel: "Filtrar",
            tabBarIcon: (props) => <Icon5 name="search" {...props} />,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Configurações",
            tabBarIcon: (props) => <Icon name="gear" {...props} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
