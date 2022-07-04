import { useState } from "react";
import { useAuth } from "../Auth";
import { Button } from "../Components";
import { Dialog } from "../Components/Modal";
import { H1, P } from "../Components/Typography";
import { NewNote } from "./NewNote";

export const Header = ({ refetchNotes }: { refetchNotes: () => void }) => {
  const [newIsOpen, setNewIsOpen] = useState(false);
  const { me } = useAuth();

  return (
    <>
      <div
        className={
          "flex h-20 w-full box-border justify-start items-center gap-6 py-6 dark:border-white "
        }
      >
        <H1>Welcome back Jotter, {me?.name}!</H1>
        <Button type="button" size="small" onClick={() => setNewIsOpen(true)}>
          <P>Add Note +</P>
        </Button>
      </div>
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
