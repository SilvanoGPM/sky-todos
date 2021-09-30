import { StyleSheet } from "react-native";
import { colorThemes } from "../../colorThemes";

export default StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
  },

  text: {
    fontSize: 40,
    color: colorThemes.light.headerText,
    borderBottomWidth: 1,
    borderBottomColor: colorThemes.light.headerText,
    paddingHorizontal: 20,
  },
});
