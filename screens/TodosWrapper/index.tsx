import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ShowTodos } from "../ShowTodos";
import { Settings } from "../Settings";
import { FilterTodos } from "../FilterTodos";

const Tab = createBottomTabNavigator();

export const TodosWrapper: FC = () => {
  return (
    <Tab.Navigator initialRouteName="TodosList">
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
  );
};
