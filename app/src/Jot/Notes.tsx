import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "../Components";
import { Card } from "../Components/Card";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { useGetNotes } from "../client";

export const Notes = () => {
  const { data: notes, isLoading, error } = useGetNotes();
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: "setPage", page: "note" });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !notes) return <div>Error getting notes</div>;

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
        {notes.map((note) => {
          return (
            <Stack key={note.id} className="w-full">
              <Card note={note} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
