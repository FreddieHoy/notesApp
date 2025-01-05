export interface INote {
  id: string;
  heading: string;
  content?: string;
  accountId: string;
}

export type IAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
};
