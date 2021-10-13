import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Todo } from "../Todo";
import { Settings } from "../Settings";

const Tab = createBottomTabNavigator();

export const TodosWrapper: FC = () => {
  return (
    <Tab.Navigator initialRouteName="TodosList">
      <Tab.Screen
        name="TodosList"
        component={Todo}
        options={{
          title: "SkyTODOs",
          tabBarIcon: (props) => <Icon5 name="tasks" {...props} />,
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
