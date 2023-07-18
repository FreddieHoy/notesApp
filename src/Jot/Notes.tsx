import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";
import { Button } from "../Components";
import { useGlobalDispatch } from "../Utils/GlobalContext";

export const Notes = () => {
  const { readNotes, refetchNotes } = useNotes();
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: "openNote" });
  };
  return (
    <Stack gap={12} vertical>
      <Stack className="w-full" align="center" justify="space-between" gap={6}>
        <H2>Notes</H2>
        <Button intent="secondary" size="small" onClick={handleAdd}>
          +
        </Button>
      </Stack>
      <Stack gap={12} grow className="overflow-y-hidden" wrap="wrap" align="start">
        {readNotes.map((note) => {
          return (
            <Stack key={note.id} className="w-64">
              <Card note={note} refetchNotes={refetchNotes} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
