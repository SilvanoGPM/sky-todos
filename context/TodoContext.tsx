import React, {
  createContext,
  FC,
  useState,
  useContext,
  useEffect,
} from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";

import { ThemeContext } from "./ThemeContext";

import Repository from "../lib/Repository";

import { colorThemes } from "../screens/colorThemes";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type ContextType = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const TodoContext = createContext<ContextType>({} as ContextType);

const TODOS_KEY = "@SkyG0D::todos";

const repository = new Repository();

export const TodoProvider: FC = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<TodoType[]>([]);

  const colorTheme = colorThemes[theme];

  useEffect(() => {
    async function persitsTodos() {
      if (!loading) {
        await repository.save(TODOS_KEY, todos);
      }
    }

    persitsTodos();
  }, [todos, loading]);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const todos = await repository.get(TODOS_KEY);

    if (todos) {
      setTodos(todos);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colorTheme.neutralInverted} size="large" />
      </View>
    );
  }

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
