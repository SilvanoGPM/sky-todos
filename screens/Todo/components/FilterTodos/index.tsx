import React, { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { ThemesEnum } from "../../../../context/ThemeContext";

import { colorThemes } from "../../../colorThemes";

type TodoType = {
  id: string;
  title: string;
  finished: boolean;
};

type FilterTodosProps = {
  originalTodos: TodoType[];
  loading: boolean;
  filtering: boolean;
  theme: ThemesEnum;
  handleSelectedTodo: (todo: TodoType) => () => void;
  setFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

import { getStyles } from "./styles";
import { TodosList } from "../TodosList";

export const FilterTodos: FC<FilterTodosProps> = ({
  handleSelectedTodo,
  loading,
  filtering,
  theme,
  originalTodos,
  setFiltering,
}) => {
  const [todosToFilter, setTodosToFilter] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>(originalTodos);

  const styles = getStyles(theme);
  const colorTheme = colorThemes[theme];

  function filterTodos() {
    const clearedTodosToFilter = todosToFilter.trim().toLowerCase();

    if (clearedTodosToFilter) {
      const newTodos = originalTodos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(clearedTodosToFilter)
      );

      setTodos(newTodos);
      setTodosToFilter("");
      setFiltering(true);
    }
  }

  function finishFiltering() {
    setFiltering(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <TextInput
          value={todosToFilter}
          onChangeText={setTodosToFilter}
          style={styles.filter__input}
          placeholder="Pesquisar por TODOs"
          placeholderTextColor={colorTheme.filter.inputColor}
        />

        <TouchableOpacity style={styles.filter__send} onPress={filterTodos}>
          <Icon name="search" size={20} color={colorTheme.filter.iconColor} />
        </TouchableOpacity>
      </View>

      {filtering && (
        <>
          <TouchableOpacity
            style={styles.filter__close}
            onPress={finishFiltering}
          >
            <Text>
              <Icon
                name="remove"
                size={40}
                color={colorTheme.filter.closeIconColor}
              />
            </Text>
          </TouchableOpacity>

          <TodosList
            handleSelectedTodo={handleSelectedTodo}
            loading={loading}
            setTodos={setTodos}
            theme={theme}
            todos={todos}
            emptyTodosMessage="Nada encontrado..."
          />
        </>
      )}
    </View>
  );
};
