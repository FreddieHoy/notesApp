import React, { ReactNode, useState } from "react";
import { Checkbox } from "../Components";
import { Dialog } from "../Components/Modal";
import { Stack } from "../Components/Stack";
import { H1, P } from "../Components/Typography";
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

  const handleCheck = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    noteId: string
  ) => {
    e.stopPropagation();
  };

  return (
    <Stack vertical grow style={{ width: "100%" }}>
      <Stack gap={10} wrap="wrap">
        {notes.map((note) => {
          return (
            <Card key={note.id} onClick={() => setEditId(note.id)}>
              <Stack gap={6} justify="space-between" style={{ width: "100%" }}>
                <H1>{`${note.heading} (id:${note.id})`}</H1>
                {note.todoitem && (
                  <Checkbox onClick={(e) => handleCheck(e, note.id)} />
                )}
              </Stack>
              <P>{note.content}</P>
            </Card>
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
  onClick: () => void;
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
