import axios from "axios";
import useSWR from "swr";
import { UserAuth } from "./Global/Auth";
import { INote } from "./types";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

export const useGetMe = () => useSWR<UserAuth>("/me", fetcher);
export const useGetNotes = () => useSWR<INote[]>("/notes", fetcher);
export const useGetNote = (noteId: string | undefined) =>
  useSWR<INote>(noteId && `/notes/${noteId}`, fetcher);
