import { StyleSheet } from "react-native";

import { colorThemes } from "../../colorThemes";

export default StyleSheet.create({
  newTodo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  newTodo__input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colorThemes.light.newTodo,
    color: colorThemes.light.newTodo,
    paddingHorizontal: 8,
    textAlign: "right",
  },

  newTodo__icon: {
    backgroundColor: colorThemes.light.newTodo,
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
