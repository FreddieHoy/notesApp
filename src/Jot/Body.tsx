import React, { useState } from "react";
import { Button, Checkbox } from "../Components";
import { Overlay } from "../Components/Modal";
import { Stack } from "../Components/Stack";
import { H1, P } from "../Components/Typography";
import { useApi } from "../useApi";
import { EditNote } from "./EditNote";
import { Note } from "./Home";

export const Body = ({
  notes,
  refetchNotes,
}: {
  notes: Note[];
  refetchNotes: () => void;
}) => {
  const [editId, setEditId] = useState<string>();
  const [tab, setTab] = useState<"notes" | "todos">("todos");
  const editNote = notes.find((note) => note.id === editId);

  const readNotes = notes.filter((note) => !note.todoitem);
  const incompleteItems = notes.filter(
    (note) => note.todoitem && !note.checked
  );
  const completedItems = notes.filter((note) => note.todoitem && note.checked);

  return (
    <>
      <Stack vertical grow className="w-full h-full flex-wrap overflow-hidden">
        <Stack gap={10} vertical className="w-full h-full">
          <Stack className="w-full justify-between">
            <Button
              intent="minimal"
              onClick={() => setTab("todos")}
              active={tab === "todos"}
            >
              Todo
            </Button>
            <Button
              intent="minimal"
              onClick={() => setTab("notes")}
              active={tab === "notes"}
            >
              Notes
            </Button>
          </Stack>
          {tab === "notes" && (
            <Stack gap={10} vertical grow className="overflow-hidden">
              <H1 underline="primary">Notes</H1>
              <Stack gap={10} vertical grow className="overflow-y-auto">
                {readNotes.map((note) => {
                  return (
                    <Stack gap={6} align="center" key={note.id}>
                      <Card
                        key={note.id}
                        note={note}
                        refetchNotes={refetchNotes}
                        setEditId={setEditId}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}
          {tab === "todos" && (
            <Stack vertical gap={10} className="w-full h-2/3">
              <H1 underline="primary">TODO</H1>
              <Stack gap={10} vertical className="w-1/2">
                <H1 underline="fail">Incomplete</H1>
                {incompleteItems.map((note) => {
                  return (
                    <Stack gap={6} align="center" key={note.id}>
                      <Card
                        key={note.id}
                        note={note}
                        refetchNotes={refetchNotes}
                        setEditId={setEditId}
                      />
                    </Stack>
                  );
                })}
              </Stack>
              <Stack gap={10} vertical className="w-1/2">
                <H1 underline="success">Complete</H1>
                {completedItems.map((note) => {
                  return (
                    <Stack gap={6} align="center" key={note.id}>
                      <Card
                        note={note}
                        refetchNotes={refetchNotes}
                        setEditId={setEditId}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}
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
    </>
  );
};

const Card = ({
  note,
  refetchNotes,
  setEditId,
}: {
  note: Note;
  refetchNotes: () => void;
  setEditId: (val: string) => void;
}) => {
  const [hover, setHover] = useState(false);
  const api = useApi();

  const handleCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    noteId: string
  ) => {
    await api
      .put(`/notes/${note.id}`, {
        ...note,
        checked: !note.checked,
      })
      .then(async () => {
        await refetchNotes();
      })
      .catch((err) => {
        console.warn(err);
      });
    e.stopPropagation();
  };

  const handleDeleteNote = async (noteId: string) => {
    await api
      .delete(`/notes/${noteId}`)
      .then(async () => {
        await refetchNotes();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div
      className={
        "min-h-[80px] w-full bg-gray-100 dark:bg-indigo-600 rounded-md p-3 max-h-40 hover:cursor-pointer"
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack gap={6} justify="space-between" className="w-full h-[40px]">
        <H1>{`${note.heading}`}</H1>
        <Stack gap={6}>
          {hover && (
            <Stack gap={6}>
              <Button
                intent="secondary"
                size="small"
                onClick={() => setEditId(note.id)}
              >
                ✏️
              </Button>
              <Button
                intent="secondary"
                size="small"
                onClick={() => handleDeleteNote(note.id)}
              >
                🗑
              </Button>
            </Stack>
          )}
          {note.todoitem && (
            <Checkbox
              checked={note.checked}
              onChange={(e) => handleCheck(e, note.id)}
            />
          )}
        </Stack>
      </Stack>
      <P>{note.content}</P>
    </div>
  );
};
