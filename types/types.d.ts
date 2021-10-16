export type TodoType = {
  id: string;
  title: string;
  finished: boolean;
  updatedDate?: number | Date;
  finishedDate?: number | Date;
};
