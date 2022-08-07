import React, { useEffect, useState } from "react";
import { Page } from "../App";
import { useAuth } from "../Auth";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H1, H2 } from "../Components/Typography";
import { useApi } from "../useApi";
import { useGlobal, useGlobalDispatch } from "../Utils/GlobalContext";

export type Note = {
  id: string;
  heading: string;
  content: string;
  todoitem: boolean;
  checked: boolean;
};

export const Tasks = () => {
  const { page } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (page: Page) => dispatch({ type: "setPage", page });

  const { me } = useAuth();
  const api = useApi();
  const userId = me?.id;

  const [notes, setNotes] = useState<Note[]>([]);

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
        console.log("error", e);
      }
    }
  };

  const incompleteItems = notes.filter((note) => note.todoitem && !note.checked);
  const completedItems = notes.filter((note) => note.todoitem && note.checked);

  return (
    <div
      className={
        "flex flex-col h-full w-full p-8 box-border gap-3 dark:bg-gray-800 overflow-hidden"
      }
    >
      <H1 underline="primary">Jotter</H1>
      <Stack vertical grow className="w-full h-full flex-wrap overflow-hidden">
        <Stack gap={10} vertical className="w-full h-full">
          <H2>Tasks</H2>
          <Stack gap={10} vertical grow className="overflow-hidden">
            <Stack gap={10} vertical>
              {incompleteItems.map((note) => {
                return <Card key={note.id} note={note} refetchNotes={refetchNotes} />;
              })}
            </Stack>
            <Stack gap={10} vertical>
              {completedItems.map((note) => {
                return (
                  <Stack gap={6} align="center" key={note.id}>
                    <Card note={note} refetchNotes={refetchNotes} />
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
