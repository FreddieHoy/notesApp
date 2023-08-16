import React, { useCallback, useState } from "react";
import { Checkbox } from ".";
import { Stack } from "./Stack";
import { H3, P } from "./Typography";
import { useApi } from "../Utils/useApi";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { Note } from "../Global/NoteContext";

export const Card = ({ note, refetchNotes }: { note: Note; refetchNotes: () => void }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const api = useApi();
  const dispatch = useGlobalDispatch();
  const setPage = useCallback((id: string) => dispatch({ type: "openNote", id }), [dispatch]);

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
    <Stack className={"w-full overflow-hidden"}>
      {note.todoitem && (
        <Checkbox checked={note.checked} onChange={(e) => handleCheck(e, note.id)} />
      )}
      <Stack
        className={
          "bg-gray-50 dark:bg-gray-800 rounded-md hover:cursor-pointer hover:shadow grow border border-gray-300 dark:border-gray-600 transition-all duration-400 overflow-hidden"
        }
        onClick={() => setPage(note.id)}
        padding={12}
        maxHeight={note.todoitem ? "" : 300}
        vertical
        grow
      >
        <Stack
          vertical
          gap={6}
          grow
          className="overflow-hidden relative"
          ref={(overflowRef) => {
            if (overflowRef) {
              setHasOverflow(overflowRef.scrollHeight > overflowRef.clientHeight);
            }
          }}
        >
          <Stack gap={6} justify="space-between">
            <H3 className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>
              {note.heading}
            </H3>
          </Stack>
          <P className="whitespace-pre-line flex grow">
            {note.content || <span className="italic text-gray-400">Add content..</span>}
          </P>
        </Stack>
        {hasOverflow && (
          <P intent="placeholder" className="top-10 right-10 ">
            See more..
          </P>
        )}
      </Stack>
    </Stack>
  );
};
