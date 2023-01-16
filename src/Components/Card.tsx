import React, { useMemo, useRef } from "react";
import { Checkbox } from "../Components";
import { Stack } from "../Components/Stack";
import { H3, P } from "../Components/Typography";
import { useApi } from "../useApi";
import { useGlobalDispatch } from "../Utils/GlobalContext";
import { Note } from "../Utils/NoteContext";

export const Card = ({ note, refetchNotes }: { note: Note; refetchNotes: () => void }) => {
  const api = useApi();
  const dispatch = useGlobalDispatch();
  const setPage = (id: string) => dispatch({ type: "openNote", id });
  const overflowRef = useRef<HTMLDivElement>(null);

  const hasOverflow = useMemo(() => {
    if (!overflowRef.current) return false;
    return overflowRef.current.scrollHeight > overflowRef.current.clientHeight;
  }, [overflowRef]);

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
          "w-full bg-gray-50 dark:bg-indigo-600 rounded-md hover:cursor-pointer grow overflow-hidden border border-gray-300 "
        }
        onClick={() => setPage(note.id)}
        padding={12}
        maxHeight={note.todoitem ? "" : 300}
      >
        <Stack vertical gap={6} grow className="overflow-hidden relavtive" ref={overflowRef}>
          <Stack gap={6} justify="space-between">
            <H3 className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>
              {note.heading}
            </H3>
          </Stack>
          <P className="whitespace-pre-line flex">{note.content}</P>
          {hasOverflow && <P className="top-10 right-10">...</P>}
        </Stack>
      </Stack>
    </Stack>
  );
};
