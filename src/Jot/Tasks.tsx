import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H1, H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";

export const Tasks = () => {
  const { completedItems, incompleteItems, refetchNotes } = useNotes();

  return (
    <div
      className={
        "flex flex-col h-full w-full p-8 box-border gap-3 dark:bg-gray-800 overflow-hidden"
      }
    >
      <H1 underline="primary">Jotter</H1>
      <Stack vertical grow className="w-full h-full flex-wrap overflow-hidden">
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
      </Stack>
    </div>
  );
};
