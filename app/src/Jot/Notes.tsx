import { useGetNotes } from '../client';
import { Card } from '../Components/Card';
import { ErrorMessage } from '../Components/Error';
import { useAuth } from '../Global/Auth';

export const Notes = () => {
  const { account } = useAuth();
  const { data: notes, isLoading, error } = useGetNotes(account?.id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !notes) return <ErrorMessage error="Error fetching notes" />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 p-4">
        {notes.map((note) => {
          return <Card note={note} key={note.id} />;
        })}
      </div>
    </div>
  );
};
