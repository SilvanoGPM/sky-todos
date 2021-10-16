import { format } from "date-fns";

export function formatDisplayDate(date: Date | number) {
  return format(date, 'dd/MM/yyyy hh:mm:ss');
}
