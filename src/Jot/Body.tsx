import React, { useState } from "react";
import { Button, Checkbox } from "../Components";
import { Dialog } from "../Components/Modal";
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
  const editNote = notes.find((note) => note.id === editId);

  const readNotes = notes.filter((note) => !note.todoitem);
  const incompleteItems = notes.filter(
    (note) => note.todoitem && !note.checked
  );
  const completedItems = notes.filter((note) => note.todoitem && note.checked);

  return (
    <Stack vertical grow className="w-full h-full">
      <Stack gap={10} vertical className="w-full h-full">
        <Stack gap={10} className="w-full h-2/3">
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
        <Stack gap={10} vertical className="h-1/3">
          <H1 underline="primary">Notes</H1>
          <Stack gap={10}>
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
      </Stack>

      {editNote && (
        <Dialog
          isOpen={!!editId}
          onClose={() => setEditId(undefined)}
          title={`Edit note ${editNote.heading}`}
        >
          <EditNote
            note={editNote}
            refetchNotes={refetchNotes}
            onClose={() => setEditId(undefined)}
          />
        </Dialog>
      )}
    </Stack>
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
        "max-w-sm w-[400px] bg-gray-100 dark:bg-indigo-600 rounded-md p-3 max-h-40 hover:cursor-pointer"
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack gap={6} justify="space-between" className="w-full h-[40px]">
        <H1>{`${note.heading}`}</H1>
        <Stack gap={6}>
          {hover && (
            <Stack gap={6}>
              {/* <P>{`id:${note.id}`}</P> */}
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
