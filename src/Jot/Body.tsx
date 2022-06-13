import { ReactNode, useState } from "react";
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
  return (
    <>
      with Stack comp
      <Stack gap={10}>
        {notes.map((note) => {
          return (
            <Card key={note.id} onClick={() => setEditId(note.id)}>
              <H1>{`${note.heading} (id:${note.id})`}</H1>
              <P>{note.content}</P>
            </Card>
          );
        })}
      </Stack>
      without Stack comp
      <div className="flex gap-2">
        {notes.map((note) => {
          return (
            <Card key={note.id} onClick={() => setEditId(note.id)}>
              <H1>{`${note.heading} (id:${note.id})`}</H1>
              <P>{note.content}</P>
            </Card>
          );
        })}
      </div>
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
    </>
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
