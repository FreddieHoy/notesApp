import { PlusIcon } from "@heroicons/react/24/solid";
import { useGetNotes } from "../client";
import { Button } from "../Components";
import { Card } from "../Components/Card";
import { ErrorMessage } from "../Components/Error";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useAuth } from "../Global/Auth";
import { useGlobalDispatch } from "../Global/GlobalContext";

export const Notes = () => {
  const { account } = useAuth();
  const { data: notes, isLoading, error } = useGetNotes(account?.id);
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: "setPage", page: "note" });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !notes) return <ErrorMessage error="Error fetching notes" />;

  return (
    <div className="flex flex-col">
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

      <div className="flex flex-col gap-4 p-4">
        {notes.map((note) => {
          return <Card note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
};
