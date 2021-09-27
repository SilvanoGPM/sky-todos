import { StyleSheet, StatusBar } from "react-native";

export const colorThemes = {
  light: {
    neutral: '#ffffff',
    neutralInverted: '#000000',
    newTodo: '#16a085',
    todoText: '#2d3436',
    todoRemove: '#d63031',
    todoSwitch: {
      on: '#ff7675',
      off: '#00b894',
    },
    todoFinished: '#b2bec3',
    todosEmpty: '#2d3436',
  },
};

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },

  newTodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  newTodo__input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colorThemes.light.newTodo,
    color: colorThemes.light.newTodo,
    paddingHorizontal: 8,
    textAlign: 'right',
  },

  newTodo__icon: {
    backgroundColor: colorThemes.light.newTodo,
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  todos: {
    marginTop: 16,
  },

  todos__empty: {
    fontSize: 30,
    color: colorThemes.light.todosEmpty,
    textAlign: 'center',
  },

  list__item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: colorThemes.light.neutralInverted,
    borderBottomWidth: 1,
  },

  list__text: {
    flex: 1,
    color: colorThemes.light.todoText,
    fontSize: 20,
    textDecorationLine: 'none',
  },

  list__actions: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
