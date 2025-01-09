import axios from 'axios';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { IAccount, INote } from './types';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export enum QueryKeys {
  ME = 'ME',
  GET_All_NOTES = 'GET_All_NOTES',
  GET_NOTE = 'GET_NOTE',
}

// --------------------- Queries ---------------------
type ClientQueryOptions<T> = UseQueryOptions<T, unknown, T, QueryKeys[]>;
export const useGetMe = (options?: ClientQueryOptions<IAccount | undefined>) => {
  return useQuery(
    [QueryKeys.ME],
    async () =>
      await instance({
        method: 'GET',
        url: '/me',
      })
        .then((res) => res.data as IAccount)
        .catch((e) => undefined),
    options,
  );
};

export const useGetNotes = (accountId: string) => {
  return useQuery(
    [QueryKeys.GET_All_NOTES],
    () => {
      return instance({
        method: 'GET',
        url: `/account/${accountId}/notes`,
      }).then((res) => res.data as INote[]);
    },
    { enabled: !!accountId },
  );
};

export const useGetNote = (noteId?: string) => {
  return useQuery(
    [QueryKeys.GET_NOTE, noteId!],
    () => {
      return instance({
        method: 'GET',
        url: `/notes/${noteId}`,
      }).then((res) => res.data as INote);
    },
    { enabled: !!noteId },
  );
};

// --------------------- Mutations ---------------------

export const useCreateNote = () => {
  return useMutation((note: Omit<INote, 'id' | 'accountId'>) =>
    instance({ url: '/notes', method: 'POST', data: note }).then((res) => res.data as INote),
  );
};

export const useUpdateNote = () => {
  return useMutation((note: INote) =>
    instance({ url: `/notes/${note.id}`, method: 'PATCH', data: note }).then(
      (res) => res.data as { note: INote },
    ),
  );
};

export const useLogin = () => {
  return useMutation((data: { email: string; password: string }) =>
    instance({ url: '/login', method: 'POST', data }).then((res) => res.data.account as IAccount),
  );
};

export const useLogout = () => {
  return useMutation(async () => {
    await instance({ url: '/logout', method: 'POST' });
  });
};

export const useRegister = () => {
  return useMutation((data: { email: string; password: string; name: string }) =>
    instance({ url: '/register', method: 'POST', data }).then((res) => res.data),
  );
};
