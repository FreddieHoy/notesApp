import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";

export const Notes = () => {
  const { readNotes, refetchNotes } = useNotes();
  return (
    <Stack gap={12} vertical>
      <Stack className="w-full" justify="space-between" align="center">
        <H2>Notes</H2>
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
