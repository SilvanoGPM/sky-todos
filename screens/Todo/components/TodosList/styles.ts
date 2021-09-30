import { StyleSheet } from "react-native";

import { colorThemes } from "../../colorThemes";

export default StyleSheet.create({

  todos: {
    marginVertical: 16,
  },

  todos__empty: {
    fontSize: 30,
    color: colorThemes.light.todosEmpty,
    textAlign: "center",
  },

  todos__loading: {
    fontSize: 30,
    color: colorThemes.light.todosLoading,
    textAlign: "center",
  },

  list__item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomColor: colorThemes.light.neutralInverted,
    borderBottomWidth: 1,
  },

  list__text: {
    flex: 1,
    color: colorThemes.light.todoText,
    fontSize: 20,
    textDecorationLine: "none",
    marginRight: 10,
  },

  list__actions: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

});
