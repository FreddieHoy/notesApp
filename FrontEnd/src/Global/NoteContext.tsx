import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useApi } from "../Utils/useApi";

export type Note = {
  id: string;
  heading: string;
  content: string;
  todoitem: boolean;
  checked: boolean;
};

type NoteContextType = {
  allNotes: Note[];
  incompleteItems: Note[];
  completedItems: Note[];
  readNotes: Note[];
  refetchNotes: () => void;
};

const NoteContext = createContext<NoteContextType>({
  allNotes: [],
  incompleteItems: [],
  completedItems: [],
  readNotes: [],
  refetchNotes: () => {},
});

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const { me } = useAuth();
  const api = useApi();
  const userId = me?.id;

  const [notes, setNotes] = useState<Note[]>([]);

  // Improve API
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await api.get("/notes");
          setNotes(res.data as Note[]);
        } catch (e) {
          console.error("notes error", e);
        }
      }
    };

    fetchData();
    // api, dep is removed to prevent endless rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const refetchNotes = async () => {
    if (userId) {
      try {
        const res = await api.get("/notes");
        setNotes(res.data as Note[]);
      } catch (e) {
        console.warn("error", e);
      }
    }
  };

  const incompleteItems = notes.filter((note) => note.todoitem && !note.checked);
  const completedItems = notes.filter((note) => note.todoitem && note.checked);
  const readNotes = notes.filter((note) => !note.todoitem);

  const value: NoteContextType = {
    allNotes: notes,
    incompleteItems,
    completedItems,
    readNotes,
    refetchNotes,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNotes = () => useContext(NoteContext);

export const useGetNote = (id?: string) => {
  const { allNotes } = useNotes();
  return allNotes.find((note) => note.id === id);
};
