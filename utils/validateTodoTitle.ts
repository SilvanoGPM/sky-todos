import Toast from "react-native-root-toast";

export const MAX_CHARS_TODO = 200;

export function validateTodoTitle(todoTitle: string) {
  const clearedTodoTitle = todoTitle.trim();

  if (clearedTodoTitle.length > MAX_CHARS_TODO) {
    const message = `O máximo de caracteres para um ToDo é ${MAX_CHARS_TODO}.`;

    Toast.show(message, {
      duration: Toast.durations.SHORT,
    });

    return null;
  }

  const isTodoTitleValid = clearedTodoTitle && clearedTodoTitle.length >= 3;

  if (!isTodoTitleValid) {
    Toast.show("O ToDo precisa ter pelo menos 3 caracteres...", {
      duration: Toast.durations.SHORT,
    });

    return null;
  }

  return clearedTodoTitle;
}
