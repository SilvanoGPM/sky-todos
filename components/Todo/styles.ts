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
    todosEmpty: '#b2bec3',
    todosLoading: '#b2bec3',
    modalClose: '#d63031',
    modalSave: '#16a085',
    modalTitleMsg: '#d63031',
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
    marginVertical: 16,
  },

  todos__empty: {
    fontSize: 30,
    color: colorThemes.light.todosEmpty,
    textAlign: 'center',
  },

  todos__loading: {
    fontSize: 30,
    color: colorThemes.light.todosLoading,
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
    marginRight: 10
  },

  list__actions: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: colorThemes.light.neutral,
    margin: 20,
    padding: 20,
    elevation: 20,
  },

  modal__close: {
    position: 'absolute',
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
    color: colorThemes.light.modalTitleMsg
  },

  modal__finished: {
    marginTop: 20,
    fontSize: 20,
  },

  modal__save__container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  modal__save: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorThemes.light.modalSave,
    padding: 8,
  },

  modal__save__text: {
    marginRight: 4,
    fontSize: 20,
    color: colorThemes.light.neutral,
    textTransform: 'uppercase',
  },

});
