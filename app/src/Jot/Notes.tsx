import { useGetNotes } from '../client';
import { Button } from '../Components';
import { Card } from '../Components/Card';
import { ErrorMessage } from '../Components/Error';
import { useAuth } from '../Global/Auth';
import { useGlobalDispatch } from '../Global/GlobalContext';

export const Notes = () => {
  const { account } = useAuth();
  const { data: notes, isLoading, error } = useGetNotes(account?.id);
  const dispatch = useGlobalDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (error || !notes) return <ErrorMessage error="Error fetching notes" />;

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl">No notes yet</h2>
        <p className="text-gray-500">Create a note to get started</p>
        <Button intent="secondary" onClick={() => dispatch({ type: 'setPage', page: 'note' })}>
          Add Note
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="columns-xs gap-x-3 gap-y-3 p-4">
        {notes.map((note) => {
          return <Card note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
};
