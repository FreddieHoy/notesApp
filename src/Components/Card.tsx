import React, { useCallback, useMemo, useRef } from "react";
import { Checkbox } from "../Components";
import { Stack } from "../Components/Stack";
import { H3, P } from "../Components/Typography";
import { useApi } from "../useApi";
import { useGlobalDispatch } from "../Utils/GlobalContext";
import { Note } from "../Utils/NoteContext";

export const Card = ({ note, refetchNotes }: { note: Note; refetchNotes: () => void }) => {
  const api = useApi();
  const dispatch = useGlobalDispatch();
  const setPage = useCallback((id: string) => dispatch({ type: "openNote", id }), [dispatch]);

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
    <Stack gap={12} align="center" className={"w-full"}>
      {note.todoitem && (
        <Checkbox checked={note.checked} onChange={(e) => handleCheck(e, note.id)} />
      )}
      <Stack
        className={
          "w-full bg-gray-50 dark:bg-neutral-800 rounded-md hover:cursor-pointer grow border border-gray-300 dark:border-gray-600"
        }
        onClick={() => setPage(note.id)}
        padding={12}
        maxHeight={note.todoitem ? "" : 300}
        vertical
      >
        <Stack vertical gap={6} grow className="overflow-hidden relative" ref={overflowRef}>
          <Stack gap={6} justify="space-between">
            <H3 className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>
              {note.heading}
            </H3>
          </Stack>
          <P className="whitespace-pre-line flex grow">
            {note.content || <span className="italic text-gray-400">Add content..</span>}
          </P>
        </Stack>
        {hasOverflow && <P className="top-10 right-10 italic text-gray-400">See more..</P>}
      </Stack>
    </Stack>
  );
};
