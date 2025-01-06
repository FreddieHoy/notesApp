export type INote = {
  id: string;
  userId: string;
  heading: string;
  content: string;
};

export type INoteCreate = Omit<INote, "id">;

export type IAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
};
