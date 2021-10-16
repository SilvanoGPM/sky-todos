import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { ThemesEnum } from "../context/SettingsContext";
import { TodoType } from "./types";

export type TodoListRouteParamList = {
  ListTodo: {
    emptyTodosMessage: string;
    todos: TodoType[];
    theme: ThemesEnum;
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  };

  UpdateTodo: {
    selectedTodo: TodoType;
  };
};

export type TodoListRouteStackParamList<T extends keyof TodoListRouteParamList> = {
  route: RouteProp<TodoListRouteParamList, T>;
  navigation: StackNavigationProp<TodoListRouteParamList, T>;
};
