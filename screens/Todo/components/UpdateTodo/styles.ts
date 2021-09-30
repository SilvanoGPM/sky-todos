import { StyleSheet } from "react-native";

import { colorThemes } from "../../colorThemes";

export default StyleSheet.create({
  modal: {
    backgroundColor: colorThemes.light.neutral,
    margin: 20,
    padding: 20,
    elevation: 20,
  },

  modal__close: {
    position: "absolute",
    right: 8,
    top: 4,
  },

  modal__id: {
    marginTop: 20,
    fontSize: 20,
  },

  modal__title__container: {
    marginTop: 20,
  },

  modal__title: {
    fontSize: 20,
  },

  modal__title__input: {
    borderWidth: 1,
    padding: 8,
    fontSize: 20,
  },

  modal__title__msg: {
    fontSize: 10,
    color: colorThemes.light.modalTitleMsg,
  },

  modal__finished: {
    marginTop: 20,
    fontSize: 20,
  },

  modal__save__container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  modal__save: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorThemes.light.modalSave,
    padding: 8,
  },

  modal__save__text: {
    marginRight: 4,
    fontSize: 20,
    color: colorThemes.light.neutral,
    textTransform: "uppercase",
  },
});
