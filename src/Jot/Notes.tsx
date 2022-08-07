import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H1, H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";

export const Notes = () => {
  const { readNotes, refetchNotes } = useNotes();
  return (
    <div
      className={
        "flex flex-col h-full w-full p-8 box-border gap-3 dark:bg-gray-800 overflow-hidden"
      }
    >
      <H1 underline="primary">Jotter</H1>
      <Stack vertical grow className="w-full h-full flex-wrap overflow-hidden">
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
      </Stack>
    </div>
  );
};
