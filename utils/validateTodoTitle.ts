import Toast from "react-native-toast-message";
import { TOAST_VISIBILITY_TIME } from "../globals";

export const MAX_CHARS_TODO = 200;

export function validateTodoTitle(todoTitle: string) {
  const clearedTodoTitle = todoTitle.trim();

  if (clearedTodoTitle.length > MAX_CHARS_TODO) {
    const message = `O máximo de caracteres para um ToDo é ${MAX_CHARS_TODO}.`;

    Toast.show({
      type: "error",
      text1: message,
      position: "bottom",
      visibilityTime: TOAST_VISIBILITY_TIME.short,
    });

    return null;
  }

  const isTodoTitleValid = clearedTodoTitle && clearedTodoTitle.length >= 3;

  if (!isTodoTitleValid) {
    Toast.show({
      type: "error",
      text1: "O ToDo precisa ter pelo menos 3 caracteres...",
      position: "bottom",
      visibilityTime: TOAST_VISIBILITY_TIME.short,
    });

    return null;
  }

  return clearedTodoTitle;
}
