export type TodoType = {
  id: string;
  title: string;
  finished: boolean;
  createdDate?: number | Date;
  updatedDate?: number | Date;
  finishedDate?: number | Date;
};
