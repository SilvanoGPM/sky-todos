import { TodoType } from "../types/types";

export function getMessageTodoByFormat(
  todos: TodoType[],
  format: "plain" | "json"
): string {
  const callbacks = {
    plain: () => todos.map((todo) => `-${todo.title}`).join("\n"),
    json: () => JSON.stringify(todos),
  };

  const callback = callbacks[format];

  return callback();
}
