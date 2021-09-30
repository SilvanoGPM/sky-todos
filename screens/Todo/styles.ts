import { StyleSheet, StatusBar } from "react-native";

import { colorThemes } from "./colorThemes";

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },

});
