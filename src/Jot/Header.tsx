import { useState } from "react";
import { useAuth } from "../Auth";
import { Button } from "../Components";
import { Dialog } from "../Components/Modal";
import { P } from "../Components/Typography";
import { NewNote } from "./NewNote";

export const Header = ({ refetchNotes }: { refetchNotes: () => void }) => {
  const [newIsOpen, setNewIsOpen] = useState(false);
  const { me } = useAuth();

  return (
    <>
      <div
        className={
          "flex flex-col h-20 w-full border-b border-gray-800 box-border justify-between py-6 dark:border-white dark:bg-gray-700"
        }
      >
        <P>Welcome back Jotter, {me?.name}!</P>
      </div>
      <Button type="button" onClick={() => setNewIsOpen(true)}>
        <P>Add Note +</P>
      </Button>
      <Dialog
        isOpen={newIsOpen}
        onClose={() => setNewIsOpen(false)}
        title="Create new note"
      >
        <NewNote
          refetchNotes={refetchNotes}
          onClose={() => setNewIsOpen(false)}
        />
      </Dialog>
    </>
  );
};
