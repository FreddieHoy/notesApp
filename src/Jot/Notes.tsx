import React, { useEffect, useState } from "react";
import { Page } from "../App";
import { useAuth } from "../Auth";
import { Button } from "../Components";
import { Card } from "../Components/Card";
import { Overlay } from "../Components/Modal";
import { Stack } from "../Components/Stack";
import { H1 } from "../Components/Typography";
import { useApi } from "../useApi";
import { EditNote } from "./EditNote";

export type Note = {
  id: string;
  heading: string;
  content: string;
  todoitem: boolean;
  checked: boolean;
};

export const Notes = ({ setPage }: { setPage: (val: Page) => void }) => {
  const [editId, setEditId] = useState<string>();

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

  const readNotes = notes.filter((note) => !note.todoitem);

  const editNote = notes.find((note) => note.id === editId);

  return (
    <div
      className={
        "flex flex-col h-full w-full p-8 box-border gap-3 dark:bg-gray-800 overflow-hidden"
      }
    >
      <H1>Jotter</H1>
      <Stack vertical grow className="w-full h-full flex-wrap overflow-hidden">
        <Stack gap={10} vertical className="w-full h-full">
          <Stack className="w-full" justify="space-between" align="center">
            <H1 underline="primary">Notes</H1>
          </Stack>
          <Stack gap={10} vertical grow className="overflow-hidden">
            <Stack gap={10} vertical grow className="overflow-y-auto">
              {readNotes.map((note) => {
                return (
                  <Card
                    key={note.id}
                    note={note}
                    refetchNotes={refetchNotes}
                    setEditId={setEditId}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {editNote && (
        <Overlay isOpen={!!editId}>
          <EditNote
            note={editNote}
            refetchNotes={refetchNotes}
            onClose={() => setEditId(undefined)}
          />
        </Overlay>
      )}
    </div>
  );
};
