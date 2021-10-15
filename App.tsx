import React from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TodosWrapper } from "./screens/TodosWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import { UpdateTodo } from "./components/UpdateTodo";
import { Text } from "react-native";

const Stack = createStackNavigator();

function Update() {
  return <Text>AA</Text>;
}

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <TodoProvider>
          <StatusBar style="light" />

          <Stack.Navigator>
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

          <Toast ref={(ref) => Toast.setRef(ref)} />
        </TodoProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
