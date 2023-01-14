import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";

export const Tasks = () => {
  const { completedItems, incompleteItems, refetchNotes } = useNotes();

  return (
    <Stack gap={10} vertical className="w-full h-full">
      <H2>Tasks</H2>
      <Stack gap={10} vertical grow className="overflow-hidden">
        <Stack gap={10} vertical>
          {incompleteItems.map((note) => {
            return <Card key={note.id} note={note} refetchNotes={refetchNotes} />;
          })}
        </Stack>
        <Stack gap={10} vertical>
          {completedItems.map((note) => {
            return (
              <Stack gap={6} align="center" key={note.id}>
                <Card note={note} refetchNotes={refetchNotes} />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
