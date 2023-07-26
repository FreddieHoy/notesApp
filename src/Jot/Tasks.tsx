import React from "react";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useNotes } from "../Utils/NoteContext";
import { Button } from "../Components";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { PlusIcon } from "@heroicons/react/24/solid";

export const Tasks = () => {
  const { completedItems, incompleteItems, refetchNotes } = useNotes();
  const dispatch = useGlobalDispatch();
  const handleAdd = () => {
    dispatch({ type: "openNote", isInitiallyToDo: true });
  };

  return (
    <Stack vertical className="w-full h-full" gap={12}>
      <Stack
        className="w-full border-b"
        align="center"
        justify="space-between"
        gap={6}
        padding={12}
      >
        <H2>Tasks</H2>
        <Button intent="secondary" size="small" onClick={handleAdd}>
          <PlusIcon className="h-6 w-6" />
        </Button>
      </Stack>

      <Stack
        gap={12}
        padding={"0 12px"}
        vertical
        grow
        className="overflow-y-scroll w-full w-max-[700px]"
      >
        <Stack vertical gap={12}>
          {incompleteItems.map((note) => {
            return <Card key={note.id} note={note} refetchNotes={refetchNotes} />;
          })}
        </Stack>

        {completedItems.length > 0 && incompleteItems.length > 0 && (
          <div className="border-t-2 w-full" />
        )}

        <Stack vertical gap={12}>
          {completedItems.map((note) => {
            return <Card note={note} refetchNotes={refetchNotes} />;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
