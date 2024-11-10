export type INote = {
  id: string;
  userId: string;
  heading: string;
  content: string;
  // date_created: Date;
  toDoItem: boolean;
  checked?: boolean;
};

export type IAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
};
