import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";
import { Button } from "../Components";
import { useGlobalDispatch } from "../Utils/GlobalContext";

export const Tasks = () => {
  const { completedItems, incompleteItems, refetchNotes } = useNotes();
  const dispatch = useGlobalDispatch();
  const handleAdd = () => {
    dispatch({ type: "openNote" });
  };

  return (
    <Stack gap={10} vertical className="w-full h-full">
      <Stack className="w-full" align="center" justify="space-between" gap={6}>
        <H2>Tasks</H2>
        <Button intent="secondary" size="small" onClick={handleAdd}>
          +
        </Button>
      </Stack>
      <Stack gap={20} vertical>
        <Stack gap={10} vertical>
          {incompleteItems.map((note) => {
            return (
              <Stack gap={6} align="center" key={note.id}>
                <Card key={note.id} note={note} refetchNotes={refetchNotes} />
              </Stack>
            );
          })}
        </Stack>
        <div className="border-t-2 w-full" />
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
