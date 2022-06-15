import React, { ReactNode, useState } from "react";
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
  const api = useApi();
  const [editId, setEditId] = useState<string>();
  const editNote = notes.find((note) => note.id === editId);

  const handleCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    noteId: string
  ) => {
    const editNote = notes.find((note) => noteId === note.id);
    if (editNote) {
      await api
        .put(`/notes/${editNote.id}`, {
          ...editNote,
          checked: !editNote.checked,
        })
        .then(() => {
          refetchNotes();
        })
        .catch((err) => {
          console.warn(err);
        });
    }
    e.stopPropagation();
  };

  const handleDeleteNote = async (noteId: string) => {
    await api
      .delete(`/notes/${noteId}`)
      .then(() => {
        refetchNotes();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <Stack vertical grow style={{ width: "100%" }}>
      <Stack gap={10} wrap="wrap">
        {notes.map((note) => {
          return (
            <Stack>
              <Card key={note.id}>
                <Stack
                  gap={6}
                  justify="space-between"
                  style={{ width: "100%" }}
                >
                  <H1>{`${note.heading} (id:${note.id})`}</H1>
                  {note.todoitem && (
                    <Checkbox
                      checked={note.checked}
                      onChange={(e) => handleCheck(e, note.id)}
                    />
                  )}
                </Stack>
                <P>{note.content}</P>
              </Card>
              <Button onClick={() => setEditId(note.id)}>✏️</Button>
              <Button onClick={() => handleDeleteNote(note.id)}>🗑</Button>
            </Stack>
          );
        })}
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
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={
        "max-w-sm min-w-[300px] bg-cyan-100 rounded-md p-3 max-h-40 hover:cursor-pointer"
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};
