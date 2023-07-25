import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";
import { Button } from "../Components";
import { useGlobalDispatch } from "../Utils/GlobalContext";
import { PlusIcon } from "@heroicons/react/24/solid";

export const Notes = () => {
  const { readNotes, refetchNotes } = useNotes();
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: "openNote" });
  };
  return (
    <Stack vertical className="overflow-hidden">
      <Stack
        className="w-full border-b"
        align="center"
        justify="space-between"
        gap={6}
        padding={12}
      >
        <H2>Notes</H2>
        <Button intent="secondary" size="small" onClick={handleAdd}>
          <PlusIcon className="h-6 w-6" />
        </Button>
      </Stack>

      <Stack
        gap={12}
        grow
        wrap="wrap"
        align="start"
        className="overflow-y-scroll w-full"
        padding={12}
      >
        {readNotes.map((note) => {
          return (
            <Stack key={note.id} className="w-full">
              <Card note={note} refetchNotes={refetchNotes} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
