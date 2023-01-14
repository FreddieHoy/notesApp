import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";

export const Notes = () => {
  const { readNotes, refetchNotes } = useNotes();
  return (
    <Stack gap={10} vertical className="w-full h-full">
      <Stack className="w-full" justify="space-between" align="center">
        <H2>Notes</H2>
      </Stack>
      <Stack gap={10} vertical grow className="overflow-hidden">
        <Stack gap={10} vertical grow className="overflow-y-auto">
          {readNotes.map((note) => {
            return <Card key={note.id} note={note} refetchNotes={refetchNotes} />;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
