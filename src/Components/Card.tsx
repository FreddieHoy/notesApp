import React from "react";
import { Checkbox } from "../Components";
import { Stack } from "../Components/Stack";
import { H2, P } from "../Components/Typography";
import { Note } from "../Jot/Tasks";
import { useApi } from "../useApi";

export const Card = ({
  note,
  refetchNotes,
  setEditId,
}: {
  note: Note;
  refetchNotes: () => void;
  setEditId: (val: string) => void;
}) => {
  const api = useApi();

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>, noteId: string) => {
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

  return (
    <Stack gap={12} className="w-full" align="center">
      {note.todoitem && (
        <Checkbox checked={note.checked} onChange={(e) => handleCheck(e, note.id)} />
      )}
      <Stack
        className={
          "min-h-[80px] w-full bg-gray-100 dark:bg-indigo-600 rounded-md max-h-40 hover:cursor-pointer grow overflow-hidden"
        }
        onClick={() => setEditId(note.id)}
        padding={12}
      >
        <Stack vertical gap={6} grow className="overflow-hidden">
          <Stack gap={6} justify="space-between">
            <H2 className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>
              {`${note.heading}`}
            </H2>
          </Stack>
          <P>{note.content}</P>
        </Stack>
      </Stack>
    </Stack>
  );
};
